// Server-side fee computation utilities
// Input: amount (number) in USD (e.g. 50000 for $50,000)
// Output: fee in cents (integer)

function computeApplicationFeeDollars(amountDollars) {
    if (typeof amountDollars !== 'number' || isNaN(amountDollars) || amountDollars <= 0) return 0;

    // Tiered structure for grants $250K - $5M
    let fee;

    if (amountDollars < 500000) {
        fee = 500; // $500 for grants $250K-$500K
    } else if (amountDollars < 1000000) {
        fee = 750; // $750 for grants $500K-$1M
    } else if (amountDollars < 2500000) {
        fee = 1250; // $1,250 for grants $1M-$2.5M
    } else {
        fee = 2000; // $2,000 for grants $2.5M-$5M
    }

    return fee; // fee in whole dollars
}

function computeApplicationFeeCents(amountDollars) {
    const feeDollars = computeApplicationFeeDollars(amountDollars);
    return Math.round(feeDollars * 100);
}

module.exports = { computeApplicationFeeDollars, computeApplicationFeeCents };
