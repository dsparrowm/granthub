export function parseAmountToNumber(amount: string): number | null {
    if (!amount) return null;
    // Extract all numbers like 50,000 or 100000
    const matches = amount.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/g);
    if (!matches) return null;
    // Convert matches to numbers removing commas
    const nums = matches.map((m) => Number(m.replace(/,/g, "")));
    // If range, pick the maximum as representative
    return Math.max(...nums);
}

export function computeApplicationFee(amount: string): number {
    // Assumptions:
    // - We use the maximum numeric value from the amount string as the basis.
    // - Fee is 0.5% (0.005) of the grant amount, with a minimum of $25 and a maximum cap of $1000.
    // - If parsing fails, default fee is $25.
    const parsed = parseAmountToNumber(amount);
    if (!parsed || isNaN(parsed)) return 25;
    const fee = Math.round(parsed * 0.005);
    return Math.max(25, Math.min(1000, fee));
}

export function formatCurrency(amount: number): string {
    return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
