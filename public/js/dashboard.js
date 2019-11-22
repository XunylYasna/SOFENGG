var dataArray = [];

// for (var i = 0; i < dataSet.length; i++) {
//     dataArray[i] = [dataSet[i].prfNumber, dataSet[i].date, dataSet[i].Last_Name, dataSet[i].Middle_Name, dataSet[i].College, dataSet[i].Degree_Program, dataSet[i].Contact_Number, dataSet[i].Facebook_Name, dataSet[i].Email, dataSet[i].Is_Officer, dataSet[i].Is_JO, dataSet[i].Position, dataSet[i].Receipt_Number];
//     for (var g = 0; g < dataArray[i].length; g++) {
//         if (typeof dataArray[i][g] == 'undefined') {
//             dataArray[i][g] = "-"
//         }
//     }

$(document).ready(function () {
    $('#dataTable').DataTable({
        data: dataArray,
        scrollY: '50vh',
        scrollCollapse: true,
        columns: [
            { title: "PRF#" },
            { title: "Date" },
            { title: "Recipient" },
            { title: "Paid Date" },
            { title: "PO's" },
        ]
    });

}); 