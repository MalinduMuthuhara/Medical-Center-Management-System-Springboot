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
                text: xhr.responseText || "Failed to load departments",
                icon: "error"
            });
        }
    });
}

//========================= Save Doctor ==================================
function handleSave(event) {
    event.preventDefault();

    const doctorId = Number($('#doctorId').val());
    const fullName = $('#fullName').val().trim();
    const contactNo = $('#contactNo').val().trim();
    const specialization = $('#specialization').val().trim();
    const departmentId = Number($('#departmentId').val());

    // Validate fields
    if (fullName === "" || contactNo === "" || specialization === "" || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Doctor object
    const obj = JSON.stringify({
        doctorId: doctorId,
        departmentId: departmentId,
        doctorName: fullName,
        specialization: specialization,
        contactNumber: contactNo
    });

    // Save doctor
    $.ajax({
        url: "/api/v1/doctor",
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
            loadDoctor();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed To Save Doctor",
                icon: "error"
            });
        }
    });
}

//========================= Update Doctor ================================
function handleUpdate(event) {

    event.preventDefault();

    const doctorId = Number($('#doctorId').val());
    const fullName = $('#fullName').val().trim();
    const contactNo = $('#contactNo').val().trim();
    const specialization = $('#specialization').val().trim();
    const departmentId = Number($('#departmentId').val());

    // Check doctor selection
    if (!doctorId) {
        Swal.fire({
            title: "Message!",
            text: "Select Doctor to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (fullName === "" || contactNo === "" || specialization === "" || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        doctorId: doctorId,
        departmentId: departmentId,
        doctorName: fullName,
        specialization: specialization,
        contactNumber: contactNo
    });

    $.ajax({
        url: "/api/v1/doctor",
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
            loadDoctor();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update doctor",
                icon: "error"
            });
        }
    });
}

//========================= Delete Doctor ================================
function handleDelete(event) {

    event.preventDefault();

    const doctorId = Number($('#doctorId').val());

    // Check doctor selection
    if (!doctorId) {

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
                url: "/api/v1/doctor/" + doctorId,
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
                    loadDoctor();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete doctor",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Doctor ================================
function selectDoctor(doctor) {

    $('#doctorId').val(doctor.doctorId);
    $('#fullName').val(doctor.doctorName);
    $('#contactNo').val(doctor.contactNumber);
    $('#specialization').val(doctor.specialization);
    $('#departmentId').val(doctor.departmentId);

    $('#formTitle').text("Edit Doctor");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ==========================
function handleCancel() {

    $("#doctorForm")[0].reset();
    $('#doctorId').val("0");

    $('#formTitle').text("Add Doctor");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Doctors ==============================
function loadDoctor() {

    $.ajax({
        url: "/api/v1/doctor",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#doctorsTableBody").empty();

            response.forEach(function (doctor) {

                const row = `
                    <tr onclick='selectDoctor(${JSON.stringify(doctor)})'
                        style="cursor: pointer;">

                        <td>${doctor.doctorId}</td>
                        <td>${doctor.doctorName}</td>
                        <td>${doctor.contactNumber}</td>
                        <td>${doctor.specialization}</td>
                        <td>${getDepartmentName(doctor.departmentId)}</td>

                    </tr>
                `;

                $("#doctorsTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Doctor",
                icon: "error"
            });
        }
    });
}

//========================= Department Name Lookup =======================
function getDepartmentName(departmentId) {

    const option = $(`#departmentId option[value="${departmentId}"]`);
    return option.length ? option.text() : departmentId;
}

//========================= Page Init =====================================
$(document).ready(function () {

    loadDepartmentDropdown();
    loadDoctor();
});