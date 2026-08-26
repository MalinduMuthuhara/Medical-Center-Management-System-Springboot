//========================= Load Patient Dropdown (for name lookup) =========
let patientList = [];
let doctorList = [];

function loadPatientList(callback) {

    $.ajax({
        url: "/api/v1/patient",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (patients) {
            patientList = patients;
            if (callback) callback();
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

//========================= Load Doctor List (for name lookup) ==============
function loadDoctorList(callback) {

    $.ajax({
        url: "/api/v1/doctor",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (doctors) {
            doctorList = doctors;
            if (callback) callback();
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

//========================= Load Appointment Dropdown =======================
function loadAppointmentDropdown() {

    $.ajax({
        url: "/api/v1/appointment",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (appointments) {

            const $dropdown = $('#appointmentId');

            $dropdown.empty();
            $dropdown.append('<option value="">Select Appointment</option>');

            appointments.forEach(function (appointment) {

                $dropdown.append(
                    `<option value="${appointment.appointmentId}">Appointment #${appointment.appointmentId} - ${getPatientName(appointment.patientId)} (Dr. ${getDoctorName(appointment.doctorId)})</option>`
                );
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load appointments",
                icon: "error"
            });
        }
    });
}

//========================= Save Lab Test =====================================
function handleSave(event) {
    event.preventDefault();

    const labTestId = Number($('#labTestId').val());
    const appointmentId = Number($('#appointmentId').val());
    const testName = $('#testName').val().trim();
    const result = $('#result').val().trim();
    const testDate = $('#testDate').val();

    // Validate fields
    if (!appointmentId || testName === "" || result === "" || testDate === "") {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // LabTest object
    const obj = JSON.stringify({
        labTestId: labTestId,
        appointmentId: appointmentId,
        testName: testName,
        result: result,
        testDate: testDate
    });

    // Save lab test
    $.ajax({
        url: "/api/v1/labtest",
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
            loadLabTest();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save lab test",
                icon: "error"
            });
        }
    });
}

//========================= Update Lab Test ===================================
function handleUpdate(event) {

    event.preventDefault();

    const labTestId = Number($('#labTestId').val());
    const appointmentId = Number($('#appointmentId').val());
    const testName = $('#testName').val().trim();
    const result = $('#result').val().trim();
    const testDate = $('#testDate').val();

    // Check lab test selection
    if (!labTestId) {
        Swal.fire({
            title: "Message!",
            text: "Select LabTest to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (!appointmentId || testName === "" || result === "" || testDate === "") {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        labTestId: labTestId,
        appointmentId: appointmentId,
        testName: testName,
        result: result,
        testDate: testDate
    });

    $.ajax({
        url: "/api/v1/labtest",
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
            loadLabTest();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update lab test",
                icon: "error"
            });
        }
    });
}

//========================= Delete Lab Test ====================================
function handleDelete(event) {

    event.preventDefault();

    const labTestId = Number($('#labTestId').val());

    // Check lab test selection
    if (!labTestId) {

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
                url: "/api/v1/labtest/" + labTestId,
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
                    loadLabTest();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete lab test",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Lab Test =====================================
function selectLabTest(labTest) {

    $('#labTestId').val(labTest.labTestId);
    $('#appointmentId').val(labTest.appointmentId);
    $('#testName').val(labTest.testName);
    $('#result').val(labTest.result);
    $('#testDate').val(labTest.testDate);

    $('#formTitle').text("Edit Lab Test");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form =============================
function handleCancel() {

    $("#labTestForm")[0].reset();
    $('#labTestId').val("0");

    $('#formTitle').text("Add Lab Test");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Lab Tests ====================================
function loadLabTest() {

    $.ajax({
        url: "/api/v1/labtest",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#labTestTableBody").empty();

            response.forEach(function (labTest) {

                const row = `
                    <tr onclick='selectLabTest(${JSON.stringify(labTest)})'
                        style="cursor: pointer;">

                        <td>${labTest.labTestId}</td>
                        <td>Appointment #${labTest.appointmentId}</td>
                        <td>${labTest.testName}</td>
                        <td>${labTest.result}</td>
                        <td>${labTest.testDate}</td>

                    </tr>
                `;

                $("#labTestTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Lab Test",
                icon: "error"
            });
        }
    });
}

//========================= Patient Name Lookup ==============================
function getPatientName(patientId) {

    const patient = patientList.find(p => p.patientId === patientId);
    return patient ? patient.patientName : patientId;
}

//========================= Doctor Name Lookup ================================
function getDoctorName(doctorId) {

    const doctor = doctorList.find(d => d.doctorId === doctorId);
    return doctor ? doctor.doctorName : doctorId;
}

//========================= Page Init =========================================
$(document).ready(function () {

    loadPatientList(function () {
        loadDoctorList(function () {
            loadAppointmentDropdown();
            loadLabTest();
        });
    });
});