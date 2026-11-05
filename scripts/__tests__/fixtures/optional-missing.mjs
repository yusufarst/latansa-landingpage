// All required facts resolved, one contact channel resolved, optional facts unresolved.
export const company = {
  legalName: {
    value: "CV. Contoh",
    status: "client-confirmed",
    source: "test",
    launch: "required",
  },
  address: {
    value: { street: "Jl. Contoh" },
    status: "client-provided",
    source: "test",
    launch: "required",
  },
  officeHours: {
    value: "Senin–Jumat",
    status: "needs-confirmation",
    source: "test",
    launch: "optional",
  },
  contact: {
    whatsapp: {
      value: "6281200000000",
      status: "client-provided",
      source: "test",
      launch: { atLeastOneOf: "contact" },
    },
    email: {
      value: null,
      status: "missing",
      source: "test",
      launch: { atLeastOneOf: "contact" },
    },
  },
  procurementChannels: [
    {
      id: "marketplace",
      name: {
        value: "Marketplace",
        status: "unverified",
        source: "test",
        launch: "optional",
      },
      url: { value: null, status: "missing", source: "test", launch: "optional" },
    },
  ],
};
