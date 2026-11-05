// A required fact is unresolved; everything else is fine.
export const company = {
  legalName: {
    value: "CV. Contoh",
    status: "client-confirmed",
    source: "test",
    launch: "required",
  },
  address: { value: null, status: "missing", source: "test", launch: "required" },
  contact: {
    whatsapp: {
      value: null,
      status: "missing",
      source: "test",
      launch: { atLeastOneOf: "contact" },
    },
    email: {
      value: "info@contoh.test",
      status: "client-provided",
      source: "test",
      launch: { atLeastOneOf: "contact" },
    },
  },
};
