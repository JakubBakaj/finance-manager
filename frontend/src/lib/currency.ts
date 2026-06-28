export const formatCurrency = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
}).format;
