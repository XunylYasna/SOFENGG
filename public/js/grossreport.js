console.log(dataSet)

const dataSetKey = Object.keys(dataSet)

var dataArray = [];
var grosstotal = 0;
dataSetKey.forEach((key, index) => {
    const data = dataSet[key]
    dataArray[index] = [data.prfNumber, data.date, data.date, data.total, data.poTotal, (data.total - data.poTotal)]
    grosstotal = grosstotal + (data.total - data.poTotal)
})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, day, month].join('-');
}

$.fn.dataTableExt.afnFiltering.push(
    function( settings, data, dataIndex ) {
        var from = $('#datefilterfrom').val();
        var to = $('#datefilterto').val();
        var day = new Date(data[1]) || 0; // use data for the date column

        day = formatDate(day);
 
        if ( ( !from && !to ) ||
             ( !from && day <= to ) ||
             ( from <= day && !to ) ||
             ( from <= day && day <= to ) )
        {
            return true;
        }
        return false;
    }
);

$(document).ready(function () {

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
            { title: "Date",
                render: function(data, type, full) {
                    return moment(data).format('DD/MM/YYYY HH:mm:ss'); 
                }
            },
            { title: "Paid Date",
                render: function(data, type, full) {
                    return moment(data).format('DD/MM/YYYY HH:mm:ss'); 
                }
            },
            { title: "PRF Amount" },
            { title: "PO Amount" },
            { title: "Gross"}
        ],


    });

    $('#totalgross').val(grosstotal);

    var table = $('#dataTable').DataTable();

    $('#datefilterfrom, #datefilterto').on('change', function() {
        table.draw();
    } );
    
});