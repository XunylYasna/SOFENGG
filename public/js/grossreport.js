console.log(dataSet)

const dataSetKey = Object.keys(dataSet)

var dataArray = [];
var grosstotal;
dataSetKey.forEach((key, index) => {
    const data = dataSet[key]
    dataArray[index] = [data.prfNumber, data.date, data.date, data.total, data.total, (data.total - data.total)]
    grosstotal = grosstotal + (data.total - data.total)
})

$(document).ready(function () {
    $.fn.dataTable.moment('MMMM Do, YYYY');

    $.fn.dataTable.moment = function ( format, locale ) {
        var types = $.fn.dataTable.ext.type;
     
        // Add type detection
        types.detect.unshift( function ( d ) {
            return moment( d, format, locale, true ).isValid() ?
                'moment-'+format :
                null;
        } );
     
        // Add sorting method - use an integer for the sorting
        types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
            return moment( d, format, locale, true ).unix();
        };
    };

    $('#dataTable').DataTable({
        data: dataArray,
        scrollCollapse: true,
        columns: [
            { title: "PRF#" },
            { title: "Date" },
            { title: "Paid Date" },
            { title: "PRF Amount" },
            { title: "PO Amount" },
            { title: "Gross"}
        ],


    });

    $('#totalgross').val(grosstotal);

});