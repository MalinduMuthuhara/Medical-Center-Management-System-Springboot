//========================= Save Department ==============================
function handleSaveDepartment(event) {
    event.preventDefault();

    const departmentId = Number($('#departmentId').val());
    const departmentName = $('#departmentName').val().trim();
    const departmentLocation = $('#departmentLocation').val().trim();

    // Validate fields
    if (departmentName === "" || departmentLocation === "") {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Department object
    const obj = JSON.stringify({
        departmentId: departmentId,
        departmentName: departmentName,
        departmentLocation: departmentLocation
    });

    // Save department
    $.ajax({
        url: "/api/v1/department",
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

            handleCancelDepartment();
            loadDepartment();
            loadDepartmentDropdown();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save department",
                icon: "error"
            });
        }
    });
}

//========================= Update Department =============================
function handleUpdateDepartment(event) {

    event.preventDefault();

    const departmentId = Number($('#departmentId').val());
    const departmentName = $('#departmentName').val().trim();
    const departmentLocation = $('#departmentLocation').val().trim();

    // Check department selection
    if (!departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Select Department to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (departmentName === "" || departmentLocation === "") {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        departmentId: departmentId,
        departmentName: departmentName,
        departmentLocation: departmentLocation
    });

    $.ajax({
        url: "/api/v1/department",
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

            handleCancelDepartment();
            loadDepartment();
            loadDepartmentDropdown();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update department",
                icon: "error"
            });
        }
    });
}

//========================= Delete Department =============================
function handleDeleteDepartment(event) {

    event.preventDefault();

    const departmentId = Number($('#departmentId').val());

    // Check department selection
    if (!departmentId) {

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
                url: "/api/v1/department/" + departmentId,
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

                    handleCancelDepartment();
                    loadDepartment();
                    loadDepartmentDropdown();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete department",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Department =============================
function selectDepartment(department) {

    $('#departmentId').val(department.departmentId);
    $('#departmentName').val(department.departmentName);
    $('#departmentLocation').val(department.departmentLocation);

    $('#departmentFormTitle').text("Edit Department");

    $('#departmentSaveBtn').hide();
    $('#departmentUpdateBtn').show();
    $('#departmentDeleteBtn').show();
    $('#departmentCancelBtn').show();
}

//========================= Cancel / Reset Form ============================
function handleCancelDepartment() {

    $("#departmentForm")[0].reset();
    $('#departmentId').val("0");

    $('#departmentFormTitle').text("Add Department");

    $('#departmentSaveBtn').show();
    $('#departmentUpdateBtn').hide();
    $('#departmentDeleteBtn').hide();
    $('#departmentCancelBtn').hide();
}

//========================= Get All Departments =============================
function loadDepartment() {

    $.ajax({
        url: "/api/v1/department",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#departmentsTableBody").empty();

            response.forEach(function (department) {

                const row = `
                    <tr onclick='selectDepartment(${JSON.stringify(department)})'
                        style="cursor: pointer;">

                        <td>${department.departmentId}</td>
                        <td>${department.departmentName}</td>
                        <td>${department.departmentLocation}</td>

                    </tr>
                `;

                $("#departmentsTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Department",
                icon: "error"
            });
        }
    });
}

//========================= Load Department Dropdown (for Ward form) ======
function loadDepartmentDropdown() {

    $.ajax({
        url: "/api/v1/department",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (departments) {

            const $dropdown = $('#wardDepartmentId');
            const selected = $dropdown.val();

            $dropdown.empty();
            $dropdown.append('<option value="">Select Department</option>');

            departments.forEach(function (department) {

                $dropdown.append(
                    `<option value="${department.departmentId}">${department.departmentName}</option>`
                );
            });

            if (selected) {
                $dropdown.val(selected);
            }
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load departments",
                icon: "error"
            });
        }
    });
}

//========================= Save Ward =====================================
function handleSaveWard(event) {
    event.preventDefault();

    const wardId = Number($('#wardId').val());
    const roomNumber = $('#roomNumber').val().trim();
    const type = $('#wardType').val().trim();
    const capacity = Number($('#capacity').val());
    const departmentId = Number($('#wardDepartmentId').val());

    // Validate fields
    if (roomNumber === "" || type === "" || !capacity || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Ward object
    const obj = JSON.stringify({
        wardId: wardId,
        departmentId: departmentId,
        roomNumber: roomNumber,
        type: type,
        capacity: capacity
    });

    // Save ward
    $.ajax({
        url: "/api/v1/ward",
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

            handleCancelWard();
            loadWard();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save ward",
                icon: "error"
            });
        }
    });
}

//========================= Update Ward ====================================
function handleUpdateWard(event) {

    event.preventDefault();

    const wardId = Number($('#wardId').val());
    const roomNumber = $('#roomNumber').val().trim();
    const type = $('#wardType').val().trim();
    const capacity = Number($('#capacity').val());
    const departmentId = Number($('#wardDepartmentId').val());

    // Check ward selection
    if (!wardId) {
        Swal.fire({
            title: "Message!",
            text: "Select Ward to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (roomNumber === "" || type === "" || !capacity || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        wardId: wardId,
        departmentId: departmentId,
        roomNumber: roomNumber,
        type: type,
        capacity: capacity
    });

    $.ajax({
        url: "/api/v1/ward",
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

            handleCancelWard();
            loadWard();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update ward",
                icon: "error"
            });
        }
    });
}

//========================= Delete Ward ====================================
function handleDeleteWard(event) {

    event.preventDefault();

    const wardId = Number($('#wardId').val());

    // Check ward selection
    if (!wardId) {

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
                url: "/api/v1/ward/" + wardId,
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

                    handleCancelWard();
                    loadWard();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete ward",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Ward =====================================
function selectWard(ward) {

    $('#wardId').val(ward.wardId);
    $('#roomNumber').val(ward.roomNumber);
    $('#wardType').val(ward.type);
    $('#capacity').val(ward.capacity);
    $('#wardDepartmentId').val(ward.departmentId);

    $('#wardFormTitle').text("Edit Ward");

    $('#wardSaveBtn').hide();
    $('#wardUpdateBtn').show();
    $('#wardDeleteBtn').show();
    $('#wardCancelBtn').show();
}

//========================= Cancel / Reset Form =============================
function handleCancelWard() {

    $("#wardForm")[0].reset();
    $('#wardId').val("0");

    $('#wardFormTitle').text("Add Ward");

    $('#wardSaveBtn').show();
    $('#wardUpdateBtn').hide();
    $('#wardDeleteBtn').hide();
    $('#wardCancelBtn').hide();
}

//========================= Get All Wards ====================================
function loadWard() {

    $.ajax({
        url: "/api/v1/ward",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#wardsTableBody").empty();

            response.forEach(function (ward) {

                const row = `
                    <tr onclick='selectWard(${JSON.stringify(ward)})'
                        style="cursor: pointer;">

                        <td>${ward.wardId}</td>
                        <td>${ward.roomNumber}</td>
                        <td>${ward.type}</td>
                        <td>${ward.capacity}</td>
                        <td>${getDepartmentName(ward.departmentId)}</td>

                    </tr>
                `;

                $("#wardsTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Ward",
                icon: "error"
            });
        }
    });
}

//========================= Department Name Lookup ==========================
function getDepartmentName(departmentId) {

    const option = $(`#wardDepartmentId option[value="${departmentId}"]`);
    return option.length ? option.text() : departmentId;
}

//========================= Page Init ========================================
$(document).ready(function () {

    loadDepartment();
    loadDepartmentDropdown();
    loadWard();
});