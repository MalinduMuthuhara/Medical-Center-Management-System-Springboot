//========================= Load Medicine Dropdown ===========================
function loadMedicineDropdown() {

    $.ajax({
        url: "/api/v1/medicine",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (medicines) {

            const $dropdown = $('#medicineId');

            $dropdown.empty();
            $dropdown.append('<option value="">Select Medicine</option>');

            medicines.forEach(function (medicine) {

                $dropdown.append(
                    `<option value="${medicine.medicineId}">${medicine.medicineName}</option>`
                );
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load medicines",
                icon: "error"
            });
        }
    });
}

//========================= Load Supplier Dropdown ============================
function loadSupplierDropdown() {

    $.ajax({
        url: "/api/v1/supplier",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (suppliers) {

            const $dropdown = $('#supplierId');

            $dropdown.empty();
            $dropdown.append('<option value="">Select Supplier</option>');

            suppliers.forEach(function (supplier) {

                $dropdown.append(
                    `<option value="${supplier.supplierId}">${supplier.supplierName}</option>`
                );
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load suppliers",
                icon: "error"
            });
        }
    });
}

//========================= Save Medicine Supplier =============================
function handleSave(event) {
    event.preventDefault();

    const medicineId = Number($('#medicineId').val());
    const supplierId = Number($('#supplierId').val());

    // Validate fields
    if (!medicineId || !supplierId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // MedicineSupplier object
    const obj = JSON.stringify({
        medicineSupplierId: 0,
        medicineId: medicineId,
        supplierId: supplierId
    });

    // Save medicine supplier
    $.ajax({
        url: "/api/v1/medicinesupplier",
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
            loadMedicineSupplier();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save medicine supplier",
                icon: "error"
            });
        }
    });
}

//========================= Delete Medicine Supplier ===========================
function handleDelete(event) {

    event.preventDefault();

    const medicineSupplierId = Number($('#medicineSupplierId').val());

    // Check row selection
    if (!medicineSupplierId) {

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
                url: "/api/v1/medicinesupplier/" + medicineSupplierId,
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
                    loadMedicineSupplier();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete medicine supplier",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Medicine Supplier (row click) ===============
function selectMedicineSupplier(medicineSupplier) {

    $('#medicineSupplierId').val(medicineSupplier.medicineSupplierId);
    $('#medicineId').val(medicineSupplier.medicineId);
    $('#supplierId').val(medicineSupplier.supplierId);

    $('#formTitle').text("Selected Medicine Supplier");

    $('#saveBtn').hide();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form =============================
function handleCancel() {

    $("#medicineSupplierForm")[0].reset();
    $('#medicineSupplierId').val("0");

    $('#formTitle').text("Add Medicine Supplier");

    $('#saveBtn').show();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Medicine Suppliers =========================
function loadMedicineSupplier() {

    $.ajax({
        url: "/api/v1/medicinesupplier",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#medicineSupplierTableBody").empty();

            response.forEach(function (medicineSupplier) {

                const row = `
                    <tr onclick='selectMedicineSupplier(${JSON.stringify(medicineSupplier)})'
                        style="cursor: pointer;">

                        <td>${medicineSupplier.medicineSupplierId}</td>
                        <td>${medicineSupplier.medicineName}</td>
                        <td>${medicineSupplier.supplierName}</td>

                    </tr>
                `;

                $("#medicineSupplierTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Medicine Supplier",
                icon: "error"
            });
        }
    });
}

//========================= Page Init =========================================
$(document).ready(function () {

    loadMedicineDropdown();
    loadSupplierDropdown();
    loadMedicineSupplier();
});