//========================= Save Department ==============================
function handleSave(event) {
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

            handleCancel();
            loadDepartment();
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
function handleUpdate(event) {

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

            handleCancel();
            loadDepartment();
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
function handleDelete(event) {

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

                    handleCancel();
                    loadDepartment();
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

    $('#formTitle').text("Edit Department");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ============================
function handleCancel() {

    $("#departmentForm")[0].reset();
    $('#departmentId').val("0");

    $('#formTitle').text("Add Department");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
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

//========================= Page Init ========================================
$(document).ready(function () {

    loadDepartment();
});