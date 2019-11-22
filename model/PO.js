const mongoose = require('mongoose');

const POSchema = new mongoose.Schema({
    prfNumber: Number,
    poNumber: Number,
    buyer: String,
    date: Date,
    paxName: String,
    route: String,
    description: String,
    usAmount: Number,
    phpAmount: Number,
    total: Number,
    preparedBy: String,
    approvedBy: String,
    receivedBy: String
})

const PO = mongoose.model('PO', POSchema)

module.exports = PO;