//========================= Load Doctor Dropdown =========================
function loadDoctorDropdown() {

    $.ajax({
        url: "/api/v1/doctor",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (doctors) {

            const $dropdown = $('#doctorId');

            $dropdown.empty();
            $dropdown.append('<option value="">Select Doctor</option>');

            doctors.forEach(function (doctor) {

                $dropdown.append(
                    `<option value="${doctor.doctorId}">Dr. ${doctor.doctorName} (${doctor.specialization})</option>`
                );
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load doctors",
                icon: "error"
            });
        }
    });
}

//========================= Load Patient Dropdown ========================
function loadPatientDropdown() {

    $.ajax({
        url: "/api/v1/patient",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (patients) {

            const $dropdown = $('#patientId');

            $dropdown.empty();
            $dropdown.append('<option value="">Select Patient</option>');

            patients.forEach(function (patient) {

                $dropdown.append(
                    `<option value="${patient.patientId}">${patient.patientName}</option>`
                );
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load patients",
                icon: "error"
            });
        }
    });
}

//========================= Save Appointment ================================
function handleSave(event) {
    event.preventDefault();

    const appointmentId = Number($('#appointmentId').val());
    const doctorId = Number($('#doctorId').val());
    const patientId = Number($('#patientId').val());

    // Validate fields
    if (!doctorId || !patientId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Appointment object
    const obj = JSON.stringify({
        appointmentId: appointmentId,
        doctorId: doctorId,
        patientId: patientId
    });

    // Save appointment
    $.ajax({
        url: "/api/v1/appointment",
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
            loadAppointment();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save appointment",
                icon: "error"
            });
        }
    });
}

//========================= Update Appointment ===============================
function handleUpdate(event) {

    event.preventDefault();

    const appointmentId = Number($('#appointmentId').val());
    const doctorId = Number($('#doctorId').val());
    const patientId = Number($('#patientId').val());

    // Check appointment selection
    if (!appointmentId) {
        Swal.fire({
            title: "Message!",
            text: "Select Appointment to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (!doctorId || !patientId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        appointmentId: appointmentId,
        doctorId: doctorId,
        patientId: patientId
    });

    $.ajax({
        url: "/api/v1/appointment",
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
            loadAppointment();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update appointment",
                icon: "error"
            });
        }
    });
}

//========================= Delete Appointment ===============================
function handleDelete(event) {

    event.preventDefault();

    const appointmentId = Number($('#appointmentId').val());

    // Check appointment selection
    if (!appointmentId) {

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
                url: "/api/v1/appointment/" + appointmentId,
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
                    loadAppointment();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete appointment",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Appointment ================================
function selectAppointment(appointment) {

    $('#appointmentId').val(appointment.appointmentId);
    $('#doctorId').val(appointment.doctorId);
    $('#patientId').val(appointment.patientId);

    $('#formTitle').text("Edit Appointment");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ================================
function handleCancel() {

    $("#appointmentForm")[0].reset();
    $('#appointmentId').val("0");

    $('#formTitle').text("Add Appointment");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Appointments ================================
function loadAppointment() {

    $.ajax({
        url: "/api/v1/appointment",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#appointmentsTableBody").empty();

            response.forEach(function (appointment) {

                const row = `
                    <tr onclick='selectAppointment(${JSON.stringify(appointment)})'
                        style="cursor: pointer;">

                        <td>${appointment.appointmentId}</td>
                        <td>${getDoctorLabel(appointment.doctorId)}</td>
                        <td>${getPatientLabel(appointment.patientId)}</td>

                    </tr>
                `;

                $("#appointmentsTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Appointment",
                icon: "error"
            });
        }
    });
}

//========================= Dropdown Label Lookups ==============================
function getDoctorLabel(doctorId) {

    const option = $(`#doctorId option[value="${doctorId}"]`);
    return option.length ? option.text() : doctorId;
}

function getPatientLabel(patientId) {

    const option = $(`#patientId option[value="${patientId}"]`);
    return option.length ? option.text() : patientId;
}

//========================= Page Init ==============================================
$(document).ready(function () {

    loadDoctorDropdown();
    loadPatientDropdown();
    loadAppointment();
});