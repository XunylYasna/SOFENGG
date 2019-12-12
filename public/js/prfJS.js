
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
    $("#prfForm").attr("action", "/prf/save"); //Will set it

    document.getElementById('prfForm').classList.add('was-validated');
    if (document.getElementById('prfForm').checkValidity()) {
        alert('Current PRF will be saved')
        $("#prfForm").submit();
    }
    else {
        alert("Please fill out all the fields")
    }

}


$(document).ready(function () {
    var names = [];

    var hiddenInput = document.createElement("INPUT");
    hiddenInput.setAttribute("type", "text");
    hiddenInput.setAttribute("hidden", "true");
    hiddenInput.setAttribute("name", "names");
    $(".form").append(hiddenInput);

    $('table').on('click', '.delete', function () {
        $(this).parents('tr').remove();

        var name = $(this).parents('tr').find('#name').val();

        names = jQuery.grep(names, function (value) {
            return value != name;
        });

        console.log(names);
    }); //remove table row

    $('#addPax').on('click', function () {
        var clone = $('table tr:last').clone();

        if ($('table tr:last .form-control').val().length === 0) {
            $('table tr:last .form-control').addClass("is-invalid")
            $('table tr:last .text-danger').removeClass("invisible")
        }
        else {
            $('table tr:last .form-control').prop("disabled", true);
            $('table tr:last td:last .btn').prop("disabled", false);

            $('table tr:last').after(clone);
            var name = $('table tr:last #name').val();

            $('table tr:last .form-control').val("");

            names.push(name);
            hiddenInput.setAttribute("value", names.join("|"));
        }

        $('table tr:last .form-control').on('keydown', function () {
            $('table tr:last .form-control').removeClass("is-invalid")
            $('table tr:last .text-danger').addClass("invisible")
        })

    }) //add table row

    $("#addPax").click(function (event) {
        event.preventDefault();
    });

    $("#clear").on('click', function () {
        if (confirm("Want to clear?")) {
            $(this).closest('body').find("input[type=text], textarea").not("#poNumber, #prfNumber, #exchangeDisplay, #name").val("");
        }
    })

    $("#editExchange").on('click', function () {
        var editExchange = document.getElementById("exchangeDisplay").disabled
        if (editExchange) {
            document.getElementById("exchangeDisplay").disabled = false;
        }
        else {
            document.getElementById("exchangeDisplay").disabled = true;
        }
    })

    var tax = document.getElementById('taxField');
    var fare = document.getElementById('fareField');
    var peso = document.getElementById('pesoField');
    var dollar = document.getElementById('dollarField');

    // Listen for input event on numInput.
    tax.onkeydown = function (e) {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8 || (e.keyCode == 110) || (e.keyCode == 190) || (e.keyCode == 9))) {
            return false;
        }
    }

    fare.onkeydown = function (e) {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8 || (e.keyCode == 110) || (e.keyCode == 190) || (e.keyCode == 9))) {
            return false;
        }
    }

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
            || e.keyCode == 8 || (e.keyCode == 110) || (e.keyCode == 190) || (e.keyCode == 9))) {
            return false;
        }
    }

    $('#print').on('click', function () {

        $("#header").text('Grand Pacfic Travel & Tours')
        window.print();
        $("#header").empty();
    });
});


function goBack() {
    window.history.back();
}




