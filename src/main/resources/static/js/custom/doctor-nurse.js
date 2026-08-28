//========================= Load Department Dropdowns ====================
function loadDepartmentDropdown() {

    $.ajax({
        url: "/api/v1/department",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (departments) {

            const $doctorDropdown = $('#doctorDepartmentId');
            const $nurseDropdown = $('#nurseDepartmentId');

            const doctorSelected = $doctorDropdown.val();
            const nurseSelected = $nurseDropdown.val();

            $doctorDropdown.empty();
            $doctorDropdown.append('<option value="">Select Department</option>');

            $nurseDropdown.empty();
            $nurseDropdown.append('<option value="">Select Department</option>');

            departments.forEach(function (department) {

                const option = `<option value="${department.departmentId}">${department.departmentName}</option>`;

                $doctorDropdown.append(option);
                $nurseDropdown.append(option);
            });

            if (doctorSelected) {
                $doctorDropdown.val(doctorSelected);
            }

            if (nurseSelected) {
                $nurseDropdown.val(nurseSelected);
            }
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

//========================= Save Doctor ==================================
function handleSaveDoctor(event) {
    event.preventDefault();

    const doctorId = Number($('#doctorId').val());
    const fullName = $('#doctorFullName').val().trim();
    const contactNo = $('#doctorContactNo').val().trim();
    const specialization = $('#specialization').val().trim();
    const departmentId = Number($('#doctorDepartmentId').val());

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

            handleCancelDoctor();
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
function handleUpdateDoctor(event) {

    event.preventDefault();

    const doctorId = Number($('#doctorId').val());
    const fullName = $('#doctorFullName').val().trim();
    const contactNo = $('#doctorContactNo').val().trim();
    const specialization = $('#specialization').val().trim();
    const departmentId = Number($('#doctorDepartmentId').val());

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

            handleCancelDoctor();
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
function handleDeleteDoctor(event) {

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

                    handleCancelDoctor();
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
    $('#doctorFullName').val(doctor.doctorName);
    $('#doctorContactNo').val(doctor.contactNumber);
    $('#specialization').val(doctor.specialization);
    $('#doctorDepartmentId').val(doctor.departmentId);

    $('#doctorFormTitle').text("Edit Doctor");

    $('#doctorSaveBtn').hide();
    $('#doctorUpdateBtn').show();
    $('#doctorDeleteBtn').show();
    $('#doctorCancelBtn').show();
}

//========================= Cancel / Reset Form ==========================
function handleCancelDoctor() {

    $("#doctorForm")[0].reset();
    $('#doctorId').val("0");

    $('#doctorFormTitle').text("Add Doctor");

    $('#doctorSaveBtn').show();
    $('#doctorUpdateBtn').hide();
    $('#doctorDeleteBtn').hide();
    $('#doctorCancelBtn').hide();
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

//========================= Save Nurse =====================================
function handleSaveNurse(event) {
    event.preventDefault();

    const nurseId = Number($('#nurseId').val());
    const fullName = $('#nurseFullName').val().trim();
    const contactNo = $('#nurseContactNo').val().trim();
    const departmentId = Number($('#nurseDepartmentId').val());

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

            handleCancelNurse();
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
function handleUpdateNurse(event) {

    event.preventDefault();

    const nurseId = Number($('#nurseId').val());
    const fullName = $('#nurseFullName').val().trim();
    const contactNo = $('#nurseContactNo').val().trim();
    const departmentId = Number($('#nurseDepartmentId').val());

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

            handleCancelNurse();
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
function handleDeleteNurse(event) {

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

                    handleCancelNurse();
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
    $('#nurseFullName').val(nurse.nurseName);
    $('#nurseContactNo').val(nurse.contactNumber);
    $('#nurseDepartmentId').val(nurse.departmentId);

    $('#nurseFormTitle').text("Edit Nurse");

    $('#nurseSaveBtn').hide();
    $('#nurseUpdateBtn').show();
    $('#nurseDeleteBtn').show();
    $('#nurseCancelBtn').show();
}

//========================= Cancel / Reset Form =============================
function handleCancelNurse() {

    $("#nurseForm")[0].reset();
    $('#nurseId').val("0");

    $('#nurseFormTitle').text("Add Nurse");

    $('#nurseSaveBtn').show();
    $('#nurseUpdateBtn').hide();
    $('#nurseDeleteBtn').hide();
    $('#nurseCancelBtn').hide();
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

    const option = $(`#doctorDepartmentId option[value="${departmentId}"]`);
    return option.length ? option.text() : departmentId;
}

//========================= Page Init =========================================
$(document).ready(function () {

    loadDepartmentDropdown();
    loadDoctor();
    loadNurse();
});