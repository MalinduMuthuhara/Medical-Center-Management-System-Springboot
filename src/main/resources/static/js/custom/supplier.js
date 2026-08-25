//========================= Save Supplier ==================================
function handleSave(event) {
    event.preventDefault();

    const supplierId = Number($('#supplierId').val());
    const supplierName = $('#supplierName').val().trim();
    const contactNo = $('#contactNo').val().trim();

    // Validate fields
    if (supplierName === "" || contactNo === "") {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Supplier object
    const obj = JSON.stringify({
        supplierId: supplierId,
        supplierName: supplierName,
        contactNumber: contactNo
    });

    // Save supplier
    $.ajax({
        url: "/api/v1/supplier",
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
            loadSupplier();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save supplier",
                icon: "error"
            });
        }
    });
}

//========================= Update Supplier ==================================
function handleUpdate(event) {

    event.preventDefault();

    const supplierId = Number($('#supplierId').val());
    const supplierName = $('#supplierName').val().trim();
    const contactNo = $('#contactNo').val().trim();

    // Check supplier selection
    if (!supplierId) {
        Swal.fire({
            title: "Message!",
            text: "Select Supplier to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (supplierName === "" || contactNo === "") {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        supplierId: supplierId,
        supplierName: supplierName,
        contactNumber: contactNo
    });

    $.ajax({
        url: "/api/v1/supplier",
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
            loadSupplier();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update supplier",
                icon: "error"
            });
        }
    });
}

//========================= Delete Supplier ==================================
function handleDelete(event) {

    event.preventDefault();

    const supplierId = Number($('#supplierId').val());

    // Check supplier selection
    if (!supplierId) {

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
                url: "/api/v1/supplier/" + supplierId,
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
                    loadSupplier();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete supplier",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Supplier ==================================
function selectSupplier(supplier) {

    $('#supplierId').val(supplier.supplierId);
    $('#supplierName').val(supplier.supplierName);
    $('#contactNo').val(supplier.contactNumber);

    $('#formTitle').text("Edit Supplier");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ===============================
function handleCancel() {

    $("#supplierForm")[0].reset();
    $('#supplierId').val("0");

    $('#formTitle').text("Add Supplier");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Suppliers ==================================
function loadSupplier() {

    $.ajax({
        url: "/api/v1/supplier",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#suppliersTableBody").empty();

            response.forEach(function (supplier) {

                const row = `
                    <tr onclick='selectSupplier(${JSON.stringify(supplier)})'
                        style="cursor: pointer;">

                        <td>${supplier.supplierId}</td>
                        <td>${supplier.supplierName}</td>
                        <td>${supplier.contactNumber}</td>

                    </tr>
                `;

                $("#suppliersTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Supplier",
                icon: "error"
            });
        }
    });
}

//========================= Page Init =========================================
$(document).ready(function () {

    loadSupplier();
});