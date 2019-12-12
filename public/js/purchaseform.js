console.log(dataSet)

const dataSetKey = Object.keys(dataSet)

var dataArray = [];
dataSetKey.forEach((key, index) => {
    const data = dataSet[key]
    //dataArray[index] = [data.prfNumber, data.date, data.buyer, data.date, data.poNumber, key]
    dataArray[index] = [data.poNumber, data.date,data.buyer,data.prfNumber, key]
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
            { title: "PO#" },
            {
                title: "Date",
                render: function (data, type, full) {
                    return moment(data).format('DD/MM/YYYY HH:mm:ss');
                }
            },
            { title: "Recipient" },
            { title: "PRF" },
            {
                title: "Commands",
                render: function (data, type, row, meta) {
                    return '<form method="POST"> <input type="hidden" name="poID" value="' + data + '" /> <button type="button" class="btn btn-primary" onclick="viewPO(this)">View</button> <button type="button" class="btn btn-danger" onclick="showModal(this)">Delete</button> </form>';
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

function deletePO(button) {
    $(button).parents('form:first').attr("action", "/po/delete");
    $(button).parents('form:first').submit();
}

function viewPO(button) {
    $('#viewThis').modal('show');

    $('#btnView').click(() => {
        let val = $('#pwd3').val()
        $(button).parents('form:first').attr("method", "GET");
        $(button).parents('form:first').attr("action", "/po/view");
        $(button).parents('form:first').submit();
    })
}

function showModal(button) {
    $('#deleteThis').modal('show');

    $('#btnDelete').click(() => {
        let val = $('#pwd4').val()
        $(button).parents('form:first').attr("action", "/po/delete");
        $(button).parents('form:first').append('<input type="hidden" name="pw" value=\'' + val + '\'/>')
        $(button).parents('form:first').submit();

    })
}