//========================= Save Medicine ==================================
function handleSaveMedicine(event) {
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

            handleCancelMedicine();
            loadMedicine();
            loadMedicineDropdown();
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
function handleUpdateMedicine(event) {

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

            handleCancelMedicine();
            loadMedicine();
            loadMedicineDropdown();
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
function handleDeleteMedicine(event) {

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

                    handleCancelMedicine();
                    loadMedicine();
                    loadMedicineDropdown();
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

    $('#medicineFormTitle').text("Edit Medicine");

    $('#medicineSaveBtn').hide();
    $('#medicineUpdateBtn').show();
    $('#medicineDeleteBtn').show();
    $('#medicineCancelBtn').show();
}

//========================= Cancel / Reset Form ===============================
function handleCancelMedicine() {

    $("#medicineForm")[0].reset();
    $('#medicineId').val("0");

    $('#medicineFormTitle').text("Add Medicine");

    $('#medicineSaveBtn').show();
    $('#medicineUpdateBtn').hide();
    $('#medicineDeleteBtn').hide();
    $('#medicineCancelBtn').hide();
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

//========================= Save Supplier ==================================
function handleSaveSupplier(event) {
    event.preventDefault();

    const supplierId = Number($('#supplierId').val());
    const supplierName = $('#supplierName').val().trim();
    const contactNo = $('#supplierContactNo').val().trim();

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

            handleCancelSupplier();
            loadSupplier();
            loadSupplierDropdown();
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
function handleUpdateSupplier(event) {

    event.preventDefault();

    const supplierId = Number($('#supplierId').val());
    const supplierName = $('#supplierName').val().trim();
    const contactNo = $('#supplierContactNo').val().trim();

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

            handleCancelSupplier();
            loadSupplier();
            loadSupplierDropdown();
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
function handleDeleteSupplier(event) {

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

                    handleCancelSupplier();
                    loadSupplier();
                    loadSupplierDropdown();
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
    $('#supplierContactNo').val(supplier.contactNumber);

    $('#supplierFormTitle').text("Edit Supplier");

    $('#supplierSaveBtn').hide();
    $('#supplierUpdateBtn').show();
    $('#supplierDeleteBtn').show();
    $('#supplierCancelBtn').show();
}

//========================= Cancel / Reset Form ===============================
function handleCancelSupplier() {

    $("#supplierForm")[0].reset();
    $('#supplierId').val("0");

    $('#supplierFormTitle').text("Add Supplier");

    $('#supplierSaveBtn').show();
    $('#supplierUpdateBtn').hide();
    $('#supplierDeleteBtn').hide();
    $('#supplierCancelBtn').hide();
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

//========================= Load Medicine Dropdown (for Medicine Supplier form) ===
function loadMedicineDropdown() {

    $.ajax({
        url: "/api/v1/medicine",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (medicines) {

            const $dropdown = $('#msMedicineId');
            const selected = $dropdown.val();

            $dropdown.empty();
            $dropdown.append('<option value="">Select Medicine</option>');

            medicines.forEach(function (medicine) {

                $dropdown.append(
                    `<option value="${medicine.medicineId}">${medicine.medicineName}</option>`
                );
            });

            if (selected) {
                $dropdown.val(selected);
            }
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

//========================= Load Supplier Dropdown (for Medicine Supplier form) ===
function loadSupplierDropdown() {

    $.ajax({
        url: "/api/v1/supplier",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (suppliers) {

            const $dropdown = $('#msSupplierId');
            const selected = $dropdown.val();

            $dropdown.empty();
            $dropdown.append('<option value="">Select Supplier</option>');

            suppliers.forEach(function (supplier) {

                $dropdown.append(
                    `<option value="${supplier.supplierId}">${supplier.supplierName}</option>`
                );
            });

            if (selected) {
                $dropdown.val(selected);
            }
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
function handleSaveMedicineSupplier(event) {
    event.preventDefault();

    const medicineId = Number($('#msMedicineId').val());
    const supplierId = Number($('#msSupplierId').val());

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

            handleCancelMedicineSupplier();
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
function handleDeleteMedicineSupplier(event) {

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

                    handleCancelMedicineSupplier();
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
    $('#msMedicineId').val(medicineSupplier.medicineId);
    $('#msSupplierId').val(medicineSupplier.supplierId);

    $('#medicineSupplierFormTitle').text("Selected Medicine Supplier");

    $('#medicineSupplierSaveBtn').hide();
    $('#medicineSupplierDeleteBtn').show();
    $('#medicineSupplierCancelBtn').show();
}

//========================= Cancel / Reset Form =============================
function handleCancelMedicineSupplier() {

    $("#medicineSupplierForm")[0].reset();
    $('#medicineSupplierId').val("0");

    $('#medicineSupplierFormTitle').text("Add Medicine Supplier");

    $('#medicineSupplierSaveBtn').show();
    $('#medicineSupplierDeleteBtn').hide();
    $('#medicineSupplierCancelBtn').hide();
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

    loadMedicine();
    loadSupplier();
    loadMedicineDropdown();
    loadSupplierDropdown();
    loadMedicineSupplier();
});