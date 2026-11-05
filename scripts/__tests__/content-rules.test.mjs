import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  collectCopy,
  collectFacts,
  evaluateLaunch,
  isPublishableFact,
  pendingCopy,
  scanForbidden,
  scanUnguardedAccess,
  validateCopy,
  validateFacts,
} from "../lib/content-rules.mjs";

const root = fileURLToPath(new URL("../..", import.meta.url));
const fixture = (name) =>
  fileURLToPath(new URL(`./fixtures/${name}.mjs`, import.meta.url));

const fact = (status, value, launch) => ({ value, status, source: "test", launch });
const paths = (entries) => entries.map((e) => e.path);

/** Run the real CLI against a fixture content module. */
function runCli(...args) {
  const r = spawnSync(
    process.execPath,
    [
      "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON",
      "scripts/content-check.mjs",
      ...args,
    ],
    { cwd: root, encoding: "utf8" },
  );
  return { code: r.status, out: `${r.stdout}${r.stderr}` };
}

describe("collectFacts", () => {
  it("finds nested facts and labels array items by id", () => {
    const facts = collectFacts({
      a: fact("client-confirmed", "x", "required"),
      nested: { b: fact("missing", null, "optional") },
      list: [{ id: "item", c: fact("missing", null, "optional") }],
      plain: { title: "not a fact" },
    });
    assert.deepEqual(paths(facts), [
      "company.a",
      "company.nested.b",
      "company.list[item].c",
    ]);
  });
});

describe("evaluateLaunch", () => {
  it("does not block on unresolved optional facts", () => {
    const { blocking, deferred } = evaluateLaunch(
      collectFacts({
        name: fact("client-confirmed", "CV", "required"),
        hours: fact("needs-confirmation", "09–17", "optional"),
        channel: fact("unverified", "X", "optional"),
        url: fact("missing", null, "optional"),
      }),
    );
    assert.equal(blocking.length, 0);
    assert.deepEqual(paths(deferred), [
      "company.hours",
      "company.channel",
      "company.url",
    ]);
  });

  it("blocks when a required fact is missing", () => {
    const { blocking } = evaluateLaunch(
      collectFacts({ name: fact("missing", null, "required") }),
    );
    assert.deepEqual(paths(blocking), ["company.name"]);
  });

  it("blocks when a required fact has a value but is not confirmed", () => {
    for (const status of ["needs-confirmation", "unverified"]) {
      const { blocking } = evaluateLaunch(
        collectFacts({ name: fact(status, "CV", "required") }),
      );
      assert.equal(blocking.length, 1, status);
    }
  });

  it("blocks an atLeastOneOf group only when no member is publishable", () => {
    const group = { atLeastOneOf: "contact" };
    const none = evaluateLaunch(
      collectFacts({
        wa: fact("missing", null, group),
        email: fact("missing", null, group),
      }),
    );
    assert.equal(none.blocking.length, 1);
    assert.match(none.blocking[0].path, /group "contact"/);

    const one = evaluateLaunch(
      collectFacts({
        wa: fact("client-provided", "62812", group),
        email: fact("missing", null, group),
      }),
    );
    assert.equal(one.blocking.length, 0);
    assert.deepEqual(paths(one.deferred), ["company.email"]);
  });

  it("never treats a pending-activation fact as publishable", () => {
    const group = { atLeastOneOf: "contact" };
    const planned = fact("pending-activation", "info@contoh.co.id", group);
    assert.equal(isPublishableFact(planned), false);

    const onlyPlanned = evaluateLaunch(collectFacts({ email: planned }));
    assert.equal(onlyPlanned.blocking.length, 1);

    const withWhatsapp = evaluateLaunch(
      collectFacts({ wa: fact("client-provided", "62812", group), email: planned }),
    );
    assert.equal(withWhatsapp.blocking.length, 0);
    assert.deepEqual(paths(withWhatsapp.deferred), ["company.email"]);
  });
});

describe("confirmable copy", () => {
  const copy = (confirmation, text = "Judul") => ({ text, confirmation, source: "test" });

  it("collects copy items but not facts, and lists only pending ones", () => {
    const items = collectCopy({
      positioning: { headline: copy("pending"), tagline: copy("confirmed") },
      legalName: fact("client-confirmed", "CV", "required"),
    });
    assert.deepEqual(paths(items), [
      "company.positioning.headline",
      "company.positioning.tagline",
    ]);
    assert.deepEqual(paths(pendingCopy(items)), ["company.positioning.headline"]);
  });

  it("rejects unknown confirmation states, empty sources and empty text", () => {
    const errors = validateCopy(
      collectCopy({
        a: copy("maybe"),
        b: { text: "x", confirmation: "pending", source: "" },
        c: copy("confirmed", " "),
      }),
    );
    assert.equal(errors.length, 3);
  });
});

describe("validateFacts", () => {
  it("rejects facts without a valid launch requirement", () => {
    const errors = validateFacts(
      collectFacts({
        a: { value: "x", status: "client-confirmed", source: "test" },
        b: fact("client-confirmed", "x", "sometimes"),
        c: fact("client-confirmed", "x", { atLeastOneOf: "" }),
      }),
    );
    assert.equal(errors.length, 3);
  });

  it("rejects unknown statuses, empty sources and publishable facts without a value", () => {
    const errors = validateFacts(
      collectFacts({
        a: fact("approved", "x", "optional"),
        b: { value: "x", status: "client-provided", source: " ", launch: "optional" },
        c: fact("client-confirmed", null, "optional"),
      }),
    );
    assert.equal(errors.length, 3);
  });
});

describe("scanForbidden (sensitive data, prices, checkout)", () => {
  const flagged = [
    "Harga mulai Rp 150.000",
    "IDR 2500000",
    "Diskon akhir tahun",
    "Tambahkan ke keranjang",
    "Lanjut ke checkout",
    "Beli sekarang",
    "Stok: 12 unit",
    "NPWP 01.234.567.8-901.000",
    "NPWP 0123 4567 8901 2345",
  ];
  for (const line of flagged) {
    it(`flags: ${line}`, () => {
      assert.equal(scanForbidden(`const t = "${line}";`, "x.tsx").length > 0, true);
    });
  }

  it("ignores maintainer comment lines that state the rules", () => {
    assert.deepEqual(
      scanForbidden("// No harga or checkout anywhere\n * Rp 1", "x.ts"),
      [],
    );
  });

  it("does not flag neutral corporate copy", () => {
    const copy = "Pemasok barang dan jasa pendukung untuk instansi. Kode pos 55771.";
    assert.deepEqual(scanForbidden(copy, "x.tsx"), []);
  });
});

describe("scanUnguardedAccess (optional facts must be omitted when unresolved)", () => {
  const facts = collectFacts({
    legalName: fact("client-confirmed", "CV", "required"),
    taxStatus: fact("client-confirmed", { label: "a", value: "b" }, "required"),
    officeHours: fact("needs-confirmation", "09–17", "optional"),
    contact: { whatsapp: fact("missing", null, { atLeastOneOf: "contact" }) },
  });

  it("allows direct reads of required facts", () => {
    const ui = "<h1>{company.legalName.value}</h1><p>{company.taxStatus.value.label}</p>";
    assert.deepEqual(scanUnguardedAccess(ui, "page.tsx", facts), []);
  });

  it("rejects direct reads of optional and group facts", () => {
    const ui =
      "<p>{company.officeHours.value}</p>\n<a href={company.contact.whatsapp.value}>WA</a>";
    const v = scanUnguardedAccess(ui, "page.tsx", facts);
    assert.equal(v.length, 2);
    assert.match(v[0], /publishedValue\(company\.officeHours\)/);
  });

  it("allows guarded reads through publishedValue()", () => {
    const ui = "const hours = publishedValue(company.officeHours);";
    assert.deepEqual(scanUnguardedAccess(ui, "page.tsx", facts), []);
  });

  it("rejects reads it cannot resolve (e.g. array index access)", () => {
    const ui = "{company.procurementChannels[0].url.value}";
    assert.equal(scanUnguardedAccess(ui, "page.tsx", facts).length, 1);
  });
});

describe("content-check CLI", () => {
  it("--strict passes when only optional information is unresolved", () => {
    const r = runCli("--strict", "--content", fixture("optional-missing"));
    assert.equal(r.code, 0, r.out);
    assert.match(r.out, /launch-ready/);
    assert.match(r.out, /company\.officeHours/);
  });

  it("--strict fails when required launch information is missing", () => {
    const r = runCli("--strict", "--content", fixture("required-missing"));
    assert.equal(r.code, 1, r.out);
    assert.match(r.out, /company\.address/);
  });

  it("non-strict mode reports but does not fail on missing required information", () => {
    const r = runCli("--content", fixture("required-missing"));
    assert.equal(r.code, 0, r.out);
  });

  it("--strict fails while copy shown on the site awaits confirmation", () => {
    const r = runCli("--strict", "--content", fixture("pending-copy"));
    assert.equal(r.code, 1, r.out);
    assert.match(r.out, /pending client confirmation/);
    assert.match(r.out, /company\.positioning\.headline/);
  });

  it("non-strict mode lists pending copy without failing", () => {
    const r = runCli("--content", fixture("pending-copy"));
    assert.equal(r.code, 0, r.out);
    assert.match(r.out, /company\.positioning\.headline/);
  });

  it("fails in any mode on an invalid content model", () => {
    const r = runCli("--content", fixture("invalid-model"));
    assert.equal(r.code, 1, r.out);
    assert.match(r.out, /invalid "launch"/);
  });
});

describe("project content", () => {
  it("is a valid content model where every required fact is publishable", async () => {
    const { company } = await import("../../src/content/company.ts");
    const facts = collectFacts(company);
    assert.deepEqual(validateFacts(facts), []);
    assert.deepEqual(validateCopy(collectCopy(company)), []);
    const { blocking } = evaluateLaunch(facts);
    assert.deepEqual(blocking, []);
  });

  it("publishes the client's WhatsApp and keeps the planned email unpublished", async () => {
    const { company } = await import("../../src/content/company.ts");
    const { whatsapp, email } = company.contact;
    assert.equal(isPublishableFact(whatsapp), true);
    assert.match(whatsapp.value, /^62\d{8,13}$/);
    assert.equal(email.status, "pending-activation");
    assert.equal(isPublishableFact(email), false);
  });

  it("marks the provisional headline as pending client confirmation", async () => {
    const { company } = await import("../../src/content/company.ts");
    assert.deepEqual(paths(pendingCopy(collectCopy(company))), [
      "company.positioning.headline",
    ]);
  });

  it("publishes the owner-confirmed Google Maps listing", async () => {
    const { company } = await import("../../src/content/company.ts");
    assert.equal(company.mapsUrl.status, "client-confirmed");
    assert.equal(isPublishableFact(company.mapsUrl), true);
    assert.match(
      company.mapsUrl.value,
      /^https:\/\/www\.google\.com\/maps\/place\/Latansa\+Jogjakarta\//,
    );
  });

  it("shows no public photo disclaimer (owner decision, 2026-11-05)", async () => {
    const { copy } = await import("../../src/content/copy.ts");
    const disclaimer = /foto ilustrasi|ilustratif|unsplash license|stock photo/i;
    assert.doesNotMatch(JSON.stringify(copy), disclaimer);
    const images = readFileSync(join(root, "src", "content", "images.ts"), "utf8");
    const alts = [...images.matchAll(/alt: "([^"]+)"/g)].map((m) => m[1]);
    assert.ok(alts.length >= 7, "every photo has alt text");
    for (const alt of alts) assert.doesNotMatch(alt, disclaimer);
  });

  it("keeps the exact PKP wording and no NPWP field", async () => {
    const { company } = await import("../../src/content/company.ts");
    assert.equal(company.taxStatus.value.label, "Status Perpajakan");
    assert.equal(company.taxStatus.value.value, "Pengusaha Kena Pajak (PKP)");
    assert.equal(company.taxStatus.launch, "required");
    assert.doesNotMatch(JSON.stringify(company), /npwp"\s*:/i);
  });

  it("has no forbidden content or unguarded fact access in src/", async () => {
    const { company } = await import("../../src/content/company.ts");
    const facts = collectFacts(company);
    const found = [];
    (function walk(dir) {
      for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(tsx?|json|css)$/.test(name)) {
          const rel = relative(root, p);
          if (rel === join("src", "content", "types.ts")) continue;
          const text = readFileSync(p, "utf8");
          found.push(...scanForbidden(text, rel));
          if (/^src[\\/](app|components)/.test(rel))
            found.push(...scanUnguardedAccess(text, rel, facts));
        }
      }
    })(join(root, "src"));
    assert.deepEqual(found, []);
  });
});
