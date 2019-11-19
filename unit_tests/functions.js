const functions = {
    computePeso: (num, rate) => (num * rate).toFixed(2),

    computeDollar:(num, rate) => (num / rate).toFixed(2)
}

module.exports = functions