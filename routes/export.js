const express = require('express');
const router = express.Router();
const PRF = require('../model/PRF')
const PO = require('../model/PO')

router.get('/po', (req, res) => {
    PO.find({}, function (err, po) {
        var dataSet = {};

        po.forEach(function (po) {
            dataSet[po._id] = po;
        });

        if (err) {
            res.send(err)
        }


        // JSON to csv
        const dataSetKey = Object.keys(dataSet)

        // var dataArray = ["PRF Number", "PO Number", "Buyer", "Date", "PAX Name", "Route", "Description", "USD Amount", "PHP Amount", "Total", "Prepared By", "Approved By", "Received By"];
        var dataArray = []
        dataSetKey.forEach((key, index) => {
            const data = dataSet[key]
            dataArray[index] = [data.prfNumber, data.poNumber, data.buyer, data.date, data.paxName, data.route, data.description, data.usAmount, data.phpAmount, data.total, data.preparedBy, data.approvedBy, data.receivedBy]
        })

        var csvDownload = "PRF Number, PO Number, Buyer, Date, PAX Name, Route, Description, USD Amount, PHP Amount, Total, Prepared By, Approved By, Received By\n\r";

        dataArray.forEach(function (dataArray, index) {
            dataString = dataArray.join(",");
            csvDownload += index < dataArray.length ? dataString + "\n\r" : dataString;
        });
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'PO export ' + Date.now() + '.csv\"');
        res.send(csvDownload);
    });
})

router.get('/prf', (req, res) => {

    PRF.find({}, function (err, prf) {
        var dataSet = {};

        prf.forEach(function (prf) {
            dataSet[prf._id] = prf;
        });

        if (err) {
            res.send(err)
        }


        // JSON to csv
        const dataSetKey = Object.keys(dataSet)

        // var dataArray = ["PRF Number", "PO Number", "Buyer", "Date", "PAX Name", "Route", "Particulars", "Air Fare", "Travel Tax", "Documentations", "USD Amount", "PHP Amount", "Total", "Prepared By", "Approved By", "Received By"];
        var dataArray = []
        dataSetKey.forEach((key, index) => {
            const data = dataSet[key]
            dataArray[index] = [data.prfNumber, data.poNumber, data.buyer, data.date, data.paxName, data.route, data.particulars, data.airFare, data.travelTax, data.documentations, data.usAmount, data.phpAmount, data.total, data.preparedBy, data.approvedBy, data.receivedBy]
        })

        var csvDownload = "PRF Number, PO Number, Buyer, Date, PAX Name, Route, Particulars, Air Fare, Travel Tax, Documentations, USD Amount, PHP Amount, Total, Prepared By, Approved By, Received By\n\r";

        dataArray.forEach(function (dataArray, index) {
            dataString = dataArray.join(",");
            csvDownload += index < dataArray.length ? dataString + "\n\r" : dataString;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'PRF export ' + Date.now() + '.csv\"');
        res.send(csvDownload);
    });
})

module.exports = router;