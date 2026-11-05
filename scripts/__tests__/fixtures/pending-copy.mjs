// All facts resolved; the headline is shown but awaits the client's confirmation.
export const company = {
  legalName: {
    value: "CV. Contoh",
    status: "client-confirmed",
    source: "test",
    launch: "required",
  },
  contact: {
    whatsapp: {
      value: "6281200000000",
      status: "client-provided",
      source: "test",
      launch: { atLeastOneOf: "contact" },
    },
  },
  positioning: {
    headline: {
      text: "Judul sementara.",
      confirmation: "pending",
      source: "test",
    },
  },
};
