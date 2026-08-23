//========================= Save Medicine ==================================
function handleSave(event) {
    event.preventDefault();

    const medicineId = Number($('#medicineId').val());
    const medicineName = $('#medicineName').val().trim();
    const expireDate = $('#expireDate').val();
    const quantity = Number($('#quantity').val());
    const price = Number($('#price').val());

    // Validate fields
    if (medicineName === "" || expireDate === "" || !quantity || !price) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Medicine object
    const obj = JSON.stringify({
        medicineId: medicineId,
        medicineName: medicineName,
        expireDate: expireDate,
        medicineQuantity: quantity,
        price: price
    });

    // Save medicine
    $.ajax({
        url: "/api/v1/medicine",
        type: "POST",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "text",
        data: obj,

        success: function (response) {

            Swal.fire({
                title: "Success!",
                text: response,
                icon: "success"
            });

            handleCancel();
            loadMedicine();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save medicine",
                icon: "error"
            });
        }
    });
}

//========================= Update Medicine ==================================
function handleUpdate(event) {

    event.preventDefault();

    const medicineId = Number($('#medicineId').val());
    const medicineName = $('#medicineName').val().trim();
    const expireDate = $('#expireDate').val();
    const quantity = Number($('#quantity').val());
    const price = Number($('#price').val());

    // Check medicine selection
    if (!medicineId) {
        Swal.fire({
            title: "Message!",
            text: "Select Medicine to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (medicineName === "" || expireDate === "" || !quantity || !price) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        medicineId: medicineId,
        medicineName: medicineName,
        expireDate: expireDate,
        medicineQuantity: quantity,
        price: price
    });

    $.ajax({
        url: "/api/v1/medicine",
        type: "PUT",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "text",
        data: obj,

        success: function (response) {

            Swal.fire({
                title: "Success!",
                text: response,
                icon: "success"
            });

            handleCancel();
            loadMedicine();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update medicine",
                icon: "error"
            });
        }
    });
}

//========================= Delete Medicine ==================================
function handleDelete(event) {

    event.preventDefault();

    const medicineId = Number($('#medicineId').val());

    // Check medicine selection
    if (!medicineId) {

        Swal.fire({
            title: "Message!",
            text: "Select Row to Delete",
            icon: "warning"
        });

        return;
    }

    // Confirmation
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",

        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url: "/api/v1/medicine/" + medicineId,
                type: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("JWT")
                },
                dataType: "text",

                success: function (response) {

                    Swal.fire({
                        title: "Deleted!",
                        text: response,
                        icon: "success"
                    });

                    handleCancel();
                    loadMedicine();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete medicine",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Medicine ==================================
function selectMedicine(medicine) {

    $('#medicineId').val(medicine.medicineId);
    $('#medicineName').val(medicine.medicineName);
    $('#expireDate').val(medicine.expireDate);
    $('#quantity').val(medicine.medicineQuantity);
    $('#price').val(medicine.price);

    $('#formTitle').text("Edit Medicine");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ===============================
function handleCancel() {

    $("#medicineForm")[0].reset();
    $('#medicineId').val("0");

    $('#formTitle').text("Add Medicine");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Medicines ==================================
function loadMedicine() {

    $.ajax({
        url: "/api/v1/medicine",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#medicinesTableBody").empty();

            response.forEach(function (medicine) {

                const row = `
                    <tr onclick='selectMedicine(${JSON.stringify(medicine)})'
                        style="cursor: pointer;">

                        <td>${medicine.medicineId}</td>
                        <td>${medicine.medicineName}</td>
                        <td>${medicine.expireDate}</td>
                        <td>${medicine.medicineQuantity}</td>
                        <td>${Number(medicine.price).toFixed(2)}</td>

                    </tr>
                `;

                $("#medicinesTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Medicine",
                icon: "error"
            });
        }
    });
}

//========================= Page Init =========================================
$(document).ready(function () {

    loadMedicine();
});