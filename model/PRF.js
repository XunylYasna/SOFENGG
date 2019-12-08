const mongoose = require('mongoose');

const PRFSchema = new mongoose.Schema({
    prfNumber: Number,
    poNumber: Number,
    buyer: String,
    date: Date,
    paxNames: String,
    route: String,
    particulars: String,
    airFare: Number,
    travelTax: Number,
    documentations: String,
    usAmount: Number,
    phpAmount: Number,
    total: Number,
    preparedBy: String,
    approvedBy: String,
    receivedBy: String,
    poTotal: {type: Number, default: 0}
})

const PRF = mongoose.model('PRF', PRFSchema)

module.exports = PRF;