export function parseAmountToNumber(amount: string | number): number | null {
    if (!amount) return null;
    
    // If it's already a number, return it directly
    if (typeof amount === 'number') return amount;
    
    // If it's a string, extract all numbers like 50,000 or 100000
    const matches = amount.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/g);
    if (!matches) return null;
    // Convert matches to numbers removing commas
    const nums = matches.map((m) => Number(m.replace(/,/g, "")));
    // If range, pick the maximum as representative
    return Math.max(...nums);
}

export function computeApplicationFee(amount: string | number): number {
    // Tiered fee structure for grants $250K - $5M
    // If parsing fails, default fee is $500.
    const parsed = parseAmountToNumber(amount);
    if (!parsed || isNaN(parsed)) return 500;

    let fee;

    if (parsed < 500000) {
        fee = 500; // $500 for grants $250K-$500K
    } else if (parsed < 1000000) {
        fee = 750; // $750 for grants $500K-$1M
    } else if (parsed < 2500000) {
        fee = 1250; // $1,250 for grants $1M-$2.5M
    } else {
        fee = 2000; // $2,000 for grants $2.5M-$5M
    }

    return fee;
}

export function formatCurrency(amount: number): string {
    return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
