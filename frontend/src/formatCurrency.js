export function formatSalary(amount, currencyCode) {
  if (amount === null || amount === undefined || amount === "") {
    return "Not specified";
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount)) return String(amount);

  if (currencyCode) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
      }).format(numericAmount);
    } catch {
      // Unknown currency codes still display clearly without crashing the page.
      return `${numericAmount.toLocaleString()} ${currencyCode}`;
    }
  }

  return numericAmount.toLocaleString();
}
