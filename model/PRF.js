const mongoose = require('mongoose');

const PRFSchema = new mongoose.Schema({
    prfNumber: Number,
    poNumber: Number,
    recepient: String,
    date: Date,
    paxName: [String],
    route: String,
    particulars: String,
    airFare: Schema.Types.Decimal128,
    travelTax: Schema.Types.Decimal128,
    documentations: String,
    usAmount: Schema.Types.Decimal128,
    phpAmount: Schema.Types.Decimal128,
    total: Schema.Types.Decimal128,
    preparedBy: String,
    approvedBy: String,
    receivedBy: String
})

const PRF = mongoose.model('PRF', PRFSchema)

module.exports = PRF;