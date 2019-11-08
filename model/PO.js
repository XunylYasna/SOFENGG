const mongoose = require('mongoose');

const POSchema = new mongoose.Schema({
    prfNumber: Number,
    poNumber: Number,
    recepient: String,
    date: Date,
    paxName: [String],
    route: String,
    description: String,
    usAmount: Schema.Types.Decimal128,
    phpAmount: Schema.Types.Decimal128,
    total: Schema.Types.Decimal128,
    preparedBy: String,
    approvedBy: String,
    receivedBy: String
})

const PO = mongoose.model('PO', POSchema)

module.exports = PO;