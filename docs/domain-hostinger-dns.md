# Connecting latansajogja.co.id (Hostinger) to Cloudflare Pages

> **Do not perform any step here without explicit authorization from the project owner.**
> Changing nameservers moves all DNS for the domain, including email. A mistake can take the
> website or email offline for hours.

> **Update (2026-11-06): email is live.** The owner confirmed that Cloudflare Email Routing
> (Free) is active for `info@latansajogja.co.id`, and an inbound test email arrived. Email Routing
> works only on a zone that uses Cloudflare DNS, so some of steps 0–2 may already be done.
>
> - **Check first (read-only):** before any step, look at the zone's status and nameservers in the
>   Cloudflare dashboard.
> - **Keep the email records:** never delete, edit or proxy the Email Routing MX and TXT (SPF)
>   records. Attaching the Pages custom domain must leave them untouched.
> - **Receive-only:** Email Routing receives and forwards mail; it does not send.

The domain stays **registered at Hostinger** (renewals continue there). Only DNS hosting moves
to Cloudflare's **free** plan. This is required because Cloudflare Pages can serve an **apex**
domain (`latansajogja.co.id`, without `www`) only when the domain's DNS zone is on Cloudflare.

## 0. Inventory first (read-only)

In Hostinger hPanel → **Domains → latansajogja.co.id → DNS / Nameservers**:

- Write down the current nameservers.
- Export or screenshot **every** DNS record: A, AAAA, CNAME, **MX**, **TXT (SPF, DKIM, DMARC,
  site verifications)**, SRV, CAA.
- Find out whether email for `@latansajogja.co.id` is in use (Hostinger Email, Google
  Workspace, etc.). If yes, the MX/SPF/DKIM records **must** be recreated in Cloudflare
  exactly, or email stops working.
- Check whether **DNSSEC** is enabled at Hostinger. It must be **disabled before** changing
  nameservers (and can be re-enabled through Cloudflare afterwards).

## 1. Add the domain to Cloudflare (Free plan)

1. Cloudflare dashboard → **Add a domain** → `latansajogja.co.id` → choose **Free**.
2. Cloudflare scans existing records. **Compare against the inventory** and add anything missing
   (especially email records). Keep email records **DNS only** (grey cloud).
3. Cloudflare shows two assigned nameservers (e.g. `xxx.ns.cloudflare.com`). Note them.

## 2. Change nameservers at Hostinger

1. hPanel → Domains → latansajogja.co.id → **Nameservers → Change nameservers** → enter the two
   Cloudflare nameservers → save.
2. `.co.id` changes go through the PANDI registry. Propagation usually takes a few hours but can
   take **up to 24–48 hours**. The site and email keep working during propagation as long as
   the records were copied correctly.
3. Cloudflare emails when the zone becomes **Active**.

## 3. Attach the domain to the Pages project

1. Pages project → **Custom domains → Set up a custom domain** → `latansajogja.co.id`.
   Cloudflare creates the apex record automatically.
2. Add `www.latansajogja.co.id` as a second custom domain (or a proxied CNAME to the
   `*.pages.dev` hostname).
3. **Redirect `www` → apex:** Rules → **Redirect Rules** (free) → if hostname equals
   `www.latansajogja.co.id` → dynamic redirect to `https://latansajogja.co.id${http.request.uri.path}`,
   status 301, preserve query string.

## 4. HTTPS

- Cloudflare issues and renews the certificate automatically (free Universal SSL). Allow up to
  ~15 minutes after the domain is attached.
- SSL/TLS → **Overview**: set encryption mode to **Full (strict)**.
- SSL/TLS → Edge Certificates: enable **Always Use HTTPS**; minimum TLS 1.2.
- HSTS: enable only after the site has been stable on HTTPS for a while (it is hard to undo).

## 5. Verify

```bash
nslookup -type=ns latansajogja.co.id
curl -I https://latansajogja.co.id
curl -I https://www.latansajogja.co.id
```

Expect Cloudflare nameservers, HTTP 200 on the apex, and a 301 from `www` to the apex. Send and
receive a test email if the domain uses email.

## Rollback

Set the nameservers at Hostinger back to the values recorded in step 0. DNS returns to
Hostinger after propagation. The Pages project and its `*.pages.dev` URL keep working
regardless.

## Cost

Domain renewal at Hostinger (existing cost). Cloudflare DNS, SSL, Redirect Rules and Pages are
on the free plan — no additional recurring cost.
