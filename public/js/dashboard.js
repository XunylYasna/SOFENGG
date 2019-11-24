console.log(dataSet)

const dataSetKey = Object.keys(dataSet)

var dataArray = [];
dataSetKey.forEach((key, index) => {
    const data = dataSet[key]
    dataArray[index] = [data.prfNumber, data.date, data.buyer, data.date, data.poNumber, key]
})

$(document).ready(function () {
    $('#dataTable').DataTable({
        data: dataArray,
        scrollCollapse: true,
        columns: [
            { title: "PRF#" },
            { title: "Date" },
            { title: "Recipient" },
            { title: "Paid Date" },
            { title: "PO's" },
            {
                title: "Commands",
                render: function (data, type, row, meta) {
                    return '<form method="POST"> <input type="hidden" name="prfID" value="' + data + '" /> <button type="button" class="btn btn-primary" onclick="viewPRF(this)">View</button> <button type="button" class="btn btn-danger" onclick="deletePRF(this)">Delete</button> </form>';
                }
            }
        ],


    });

});

// function editPRF(button) {
//     $(button).parents('form:first').attr("method", "GET");
//     $(button).closest('form').attr("action", "/prf/edit");
//     $(button).parents('form:first').submit();
// }

function deletePRF(button) {
    $(button).parents('form:first').attr("action", "/prf/delete");
    $(button).parents('form:first').submit();
}

function viewPRF(button) {
    $(button).parents('form:first').attr("method", "GET");
    $(button).parents('form:first').attr("action", "/prf/view");
    $(button).parents('form:first').submit();
}