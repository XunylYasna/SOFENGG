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
<<<<<<< Updated upstream
                    return '<form method="POST"> <input type="hidden" name="prfID" value="' + data + '" /> <button type="button" class="btn btn-primary" onclick="viewPRF(this)">View</button> <button type="button" class="btn btn-danger" onclick="deletePRF(this)">Delete</button> </form>';
=======
                    return '<form method="POST" onsubmit="return false;"> <input type="hidden" name="prfID" value="' + data + '" /> <button class="btn btn-primary" onclick="viewPRF(this)">View</button> <button class="btn btn-warning" onclick="editPRF()">Edit</button> <button class="btn btn-danger" onclick="deletePRF()">Delete</button> </form>';
>>>>>>> Stashed changes
                }
            }
        ],


    });

});

<<<<<<< Updated upstream
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
=======
function editPRF(prf) {
    $(prf).closest('form').attr("action", "/prf/edit");
    $(prf).parents('form:first').submit();
}

function deletePRF() {
    $(this).parents('form:first').attr("action", "/prf/delete");
    $(this).parents('form:first').submit();
}

function viewPRF(button) {
    alert('hi')
>>>>>>> Stashed changes
    $(button).parents('form:first').attr("method", "GET");
    $(button).parents('form:first').attr("action", "/prf/view");
    $(button).parents('form:first').submit();
}