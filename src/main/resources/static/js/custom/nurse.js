//========================= Load Department Dropdown ====================
function loadDepartmentDropdown() {

    $.ajax({
        url: "/api/v1/department",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (departments) {

            const $dropdown = $('#departmentId');

            $dropdown.empty();
            $dropdown.append('<option value="">Select Department</option>');

            departments.forEach(function (department) {

                $dropdown.append(
                    `<option value="${department.departmentId}">${department.departmentName}</option>`
                );
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed To Load Departments",
                icon: "error"
            });
        }
    });
}

//========================= Save Nurse =====================================
function handleSave(event) {
    event.preventDefault();

    const nurseId = Number($('#nurseId').val());
    const fullName = $('#fullName').val().trim();
    const contactNo = $('#contactNo').val().trim();
    const departmentId = Number($('#departmentId').val());

    // Validate fields
    if (fullName === "" || contactNo === "" || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Nurse object
    const obj = JSON.stringify({
        nurseId: nurseId,
        departmentId: departmentId,
        nurseName: fullName,
        contactNumber: contactNo
    });

    // Save nurse
    $.ajax({
        url: "/api/v1/nurse",
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
            loadNurse();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save nurse",
                icon: "error"
            });
        }
    });
}

//========================= Update Nurse ====================================
function handleUpdate(event) {

    event.preventDefault();

    const nurseId = Number($('#nurseId').val());
    const fullName = $('#fullName').val().trim();
    const contactNo = $('#contactNo').val().trim();
    const departmentId = Number($('#departmentId').val());

    // Check nurse selection
    if (!nurseId) {
        Swal.fire({
            title: "Message!",
            text: "Select Nurse to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (fullName === "" || contactNo === "" || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        nurseId: nurseId,
        departmentId: departmentId,
        nurseName: fullName,
        contactNumber: contactNo
    });

    $.ajax({
        url: "/api/v1/nurse",
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
            loadNurse();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update nurse",
                icon: "error"
            });
        }
    });
}

//========================= Delete Nurse ====================================
function handleDelete(event) {

    event.preventDefault();

    const nurseId = Number($('#nurseId').val());

    // Check nurse selection
    if (!nurseId) {

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
                url: "/api/v1/nurse/" + nurseId,
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
                    loadNurse();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete nurse",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Nurse =====================================
function selectNurse(nurse) {

    $('#nurseId').val(nurse.nurseId);
    $('#fullName').val(nurse.nurseName);
    $('#contactNo').val(nurse.contactNumber);
    $('#departmentId').val(nurse.departmentId);

    $('#formTitle').text("Edit Nurse");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form =============================
function handleCancel() {

    $("#nurseForm")[0].reset();
    $('#nurseId').val("0");

    $('#formTitle').text("Add Nurse");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Nurses ====================================
function loadNurse() {

    $.ajax({
        url: "/api/v1/nurse",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#nursesTableBody").empty();

            response.forEach(function (nurse) {

                const row = `
                    <tr onclick='selectNurse(${JSON.stringify(nurse)})'
                        style="cursor: pointer;">

                        <td>${nurse.nurseId}</td>
                        <td>${nurse.nurseName}</td>
                        <td>${nurse.contactNumber}</td>
                        <td>${getDepartmentName(nurse.departmentId)}</td>

                    </tr>
                `;

                $("#nursesTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed To Load Nurse",
                icon: "error"
            });
        }
    });
}

//========================= Department Name Lookup ==========================
function getDepartmentName(departmentId) {

    const option = $(`#departmentId option[value="${departmentId}"]`);
    return option.length ? option.text() : departmentId;
}

//========================= Page Init =========================================
$(document).ready(function () {

    loadDepartmentDropdown();
    loadNurse();
});