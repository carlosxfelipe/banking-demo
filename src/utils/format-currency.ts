/**
 * Formats a numeric value as Brazilian Real (BRL) currency.
 *
 * @param value - The numeric value to format.
 * @param minimumFractionDigits - Minimum decimal places (default: 2).
 * @returns A formatted currency string, e.g. "R$ 1.234,56".
 *
 * @example
 * formatCurrency(9799)       // "R$ 9.799,00"
 * formatCurrency(816.58)     // "R$ 816,58"
 */
export function formatCurrency(
  value: number,
  minimumFractionDigits = 2,
): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits,
  });
}
