// Server-side fee computation utilities
// Input: amount (number) in USD (e.g. 50000 for $50,000)
// Output: fee in cents (integer)

function computeApplicationFeeDollars(amountDollars) {
    if (typeof amountDollars !== 'number' || isNaN(amountDollars) || amountDollars <= 0) return 0;
    const rate = 0.005; // 0.5%
    const raw = amountDollars * rate;
    const min = 25; // $25
    const max = 1000; // $1000
    const fee = Math.round(Math.min(Math.max(raw, min), max));
    return fee; // fee in whole dollars
}

function computeApplicationFeeCents(amountDollars) {
    const feeDollars = computeApplicationFeeDollars(amountDollars);
    return Math.round(feeDollars * 100);
}

module.exports = { computeApplicationFeeDollars, computeApplicationFeeCents };
