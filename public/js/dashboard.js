console.log(dataSet)

const dataSetKey = Object.keys(dataSet)

var dataArray = [];
dataSetKey.forEach((key, index) => {
    const data = dataSet[key]
    dataArray[index] = [data.prfNumber, data.date, data.buyer, data.date, data.poNumber, key]
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
    function (settings, data, dataIndex) {
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
    $('#dataTable').DataTable({
        data: dataArray,
        scrollCollapse: true,
        columns: [
            { title: "PRF#" },
            {
                title: "Date",
                render: function (data, type, full) {
                    return moment(data).format('DD/MM/YYYY HH:mm:ss');
                }
            },
            { title: "Recipient" },
            {
                title: "Paid Date",
                render: function (data, type, full) {
                    return moment(data).format('DD/MM/YYYY HH:mm:ss');
                }
            },
            { title: "PO's" },
            {
                title: "Commands",
                render: function (data, type, row, meta) {
                    return '<form method="POST"> <input type="hidden" name="prfID" value="' + data + '" /> <button type="button" class="btn btn-primary" onclick="viewPRF(this)">View</button> <button type="button" class="btn btn-danger" onclick="showModal(this)">Delete</button> </form>';
                }
            }
        ],


    });

    var table = $('#dataTable').DataTable();

    $('#datefilterfrom, #datefilterto').on('change', function () {
        table.draw();
    });

});

function editPRF(prf) {
    $(prf).closest('form').attr("action", "/prf/edit");
    $(prf).parents('form:first').submit();
}

function deletePRF(button) {
    $(button).parents('form:first').attr("action", "/prf/delete");
    $(button).parents('form:first').submit();
}

function viewPRF(button) {
    alert('hi')
    $(button).parents('form:first').attr("method", "GET");
    $(button).parents('form:first').attr("action", "/prf/view");
    $(button).parents('form:first').submit();
}

function showModal(button) {
    $('#deleteThis').modal('show');

    $('#btnDelete').click(() => {
        let val = $('#pwd4').val()
        $(button).parents('form:first').attr("action", "/prf/delete");
        $(button).parents('form:first').append('<input type="hidden" name="pw" value=\'' + val + '\'/>')
        $(button).parents('form:first').submit();

    })
}