
function computeDollar() {
    var total = parseFloat(document.getElementById("totalField").value);
    var dollar = parseFloat(document.getElementById("dollarField").value);
    var rate = parseFloat(document.getElementById("exchangeDisplay").value);
    var peso = parseFloat(document.getElementById("pesoField").value);

    if (document.getElementById("dollarField") && dollar) {
        if (document.getElementById("pesoField") && peso) {
            document.getElementById("totalField").value = parseFloat(dollar * rate + peso).toFixed(2);
        } else {
            total = 0;
            document.getElementById("totalField").value = parseFloat(dollar * rate + total).toFixed(2);
        }
    } else {
        if (document.getElementById("pesoField") && peso) {
            document.getElementById("totalField").value = parseFloat(peso.toFixed(2));
        } else {
            document.getElementById("totalField").value = 0.00;
        }
    }
}

function computePeso() {
    var total = parseFloat(document.getElementById("totalField").value);
    var dollar = parseFloat(document.getElementById("dollarField").value);
    var rate = parseFloat(document.getElementById("exchangeDisplay").value);
    var peso = parseFloat(document.getElementById("pesoField").value);

    if (document.getElementById("pesoField") && peso) {
        if (document.getElementById("dollarField") && dollar) {
            document.getElementById("totalField").value = parseFloat(dollar * rate + peso).toFixed(2);
        } else {
            total = 0;
            document.getElementById("totalField").value = parseFloat(peso + total).toFixed(2);
        }
    } else {
        if (document.getElementById("dollarField") && dollar) {
            document.getElementById("totalField").value = parseFloat(rate * dollar).toFixed(2);
        } else {
            document.getElementById("totalField").value = 0.00;
        }
    }

}
function save() {
    $("#poForm").attr("action", "/po/save"); //Will set it
    $('#totalField').prop('disabled', false)

    if (document.getElementById('pOForm').checkValidity()) {
        document.getElementById('pOForm').add('was-validated');
        alert('Current PO will be saved')
        $("#poForm").submit();
    }
    else {
        alert("Please fill out all the fields")
    }
}



$(document).ready(function () {
    var total = parseFloat(document.getElementById("totalField").value);
    var dollar = parseFloat(document.getElementById("dollarField").value);
    var rate = parseFloat(document.getElementById("exchangeDisplay").value);
    var peso = parseFloat(document.getElementById("pesoField").value);

    if (document.getElementById("dollarField") && dollar) {
        if (document.getElementById("pesoField") && peso) {
            document.getElementById("totalField").value = parseFloat((dollar * rate + peso).toFixed(2));
        } else {
            total = 0;
            document.getElementById("totalField").value = parseFloat((dollar * rate + total).toFixed(2));
        }
    } else {
        if (document.getElementById("pesoField") && peso) {
            document.getElementById("totalField").value = parseFloat(peso.toFixed(2));
        } else {
            document.getElementById("totalField").value = 0;
        }
    }

    $("#clear").on('click', function () {
        if (confirm("Want to clear?")) {
            $(this).closest('body').find("input[type=text], textarea").not("#poNumber, #prfNumber, #exchangeDisplay").val("");


        }
    })

    var tax = document.getElementById('taxField');
    var fare = document.getElementById('fareField');
    var peso = document.getElementById('pesoField');
    var dollar = document.getElementById('dollarField');


    peso.onkeydown = function (e) {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8 || (e.keyCode == 110) || (e.keyCode == 190) || (e.keyCode == 9))) {
            return false;
        }
    }

    dollar.onkeydown = function (e) {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8 || (e.keyCode == 110) || (e.keyCode == 190) || (keyCode == 9))) {
            return false;
        }
    }
});