function computeDollar() {
    var total = parseFloat(document.getElementById("totalField").value);
    var dollar = parseFloat(document.getElementById("dollarField").value);
    var rate = parseFloat(document.getElementById("exchangeDisplay").value);
    var peso = parseFloat(document.getElementById("pesoField").value);

    if (document.getElementById("dollarField") && dollar) {
        if (document.getElementById("pesoField") && peso) {
            document.getElementById("totalField").value = (dollar * rate + peso).toFixed(2);
        } else {
            total = 0;
            document.getElementById("totalField").value = (dollar * rate + total).toFixed(2);
        }
    } else {
        if (document.getElementById("pesoField") && peso) {
            document.getElementById("totalField").value = peso.toFixed(2);
        } else {
            document.getElementById("totalField").value = 0.00;
        }
    }

    if (document.getElementById("pesoField") && peso) {
        if (document.getElementById("dollarField") && dollar) {
            document.getElementById("totalField").value = (dollar * rate + peso).toFixed(2);
        } else {
            total = 0;
            document.getElementById("totalField").value = (peso + total).toFixed(2);
        }
    } else {
        if (document.getElementById("dollarField") && dollar) {
            document.getElementById("totalField").value = (rate * dollar).toFixed(2);
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
            document.getElementById("totalField").value = (dollar * rate + peso).toFixed(2);
        } else {
            total = 0;
            document.getElementById("totalField").value = (peso + total).toFixed(2);
        }
    } else {
        if (document.getElementById("dollarField") && dollar) {
            document.getElementById("totalField").value = (rate * dollar).toFixed(2);
        } else {
            document.getElementById("totalField").value = 0.00;
        }
    }

}

function save() {
    $("#poForm").attr("action", "/po/save"); //Will set it
    $("#poForm").submit();
}



$(document).ready(function () {
    var total = parseFloat(document.getElementById("totalField").value);
    var dollar = parseFloat(document.getElementById("dollarField").value);
    var rate = parseFloat(document.getElementById("exchangeDisplay").value);
    var peso = parseFloat(document.getElementById("pesoField").value);

    if (document.getElementById("dollarField") && dollar) {
        if (document.getElementById("pesoField") && peso) {
            document.getElementById("totalField").value = (dollar * rate + peso).toFixed(2);
        } else {
            total = 0;
            document.getElementById("totalField").value = (dollar * rate + total).toFixed(2);
        }
    } else {
        if (document.getElementById("pesoField") && peso) {
            document.getElementById("totalField").value = peso.toFixed(2);
        } else {
            document.getElementById("totalField").value = 0.00;
        }
    }

    $("#clear").on('click', function () {
        if (confirm("Want to clear?")) {
            $(this).closest('body').find("input[type=text], textarea").not("#poNumber, #prfNumber, #exchangeDisplay").val("");


        }
    })

});