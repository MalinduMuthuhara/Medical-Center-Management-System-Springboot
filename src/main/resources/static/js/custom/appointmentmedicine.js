//========================= Load Patient / Doctor Lists (for appointment label) ====
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

//========================= Load Appointment Dropdown ===========================
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

//========================= Load Medicine Dropdown ===============================
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

//========================= Save Appointment Medicine ============================
function handleSave(event) {
    event.preventDefault();

    const appointmentMedicineId = Number($('#appointmentMedicineId').val());
    const appointmentId = Number($('#appointmentId').val());
    const medicineId = Number($('#medicineId').val());
    const quantity = Number($('#quantity').val());

    // Validate fields
    if (!appointmentId || !medicineId || !quantity || quantity <= 0) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        appointmentMedicineId: appointmentMedicineId,
        appointmentId: appointmentId,
        medicineId: medicineId,
        quantity: quantity
    });

    $.ajax({
        url: "/api/v1/appointmentmedicine",
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
            loadAppointmentMedicine();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save appointment medicine",
                icon: "error"
            });
        }
    });
}

//========================= Update Appointment Medicine ==========================
function handleUpdate(event) {

    event.preventDefault();

    const appointmentMedicineId = Number($('#appointmentMedicineId').val());
    const appointmentId = Number($('#appointmentId').val());
    const medicineId = Number($('#medicineId').val());
    const quantity = Number($('#quantity').val());

    // Check row selection
    if (!appointmentMedicineId) {
        Swal.fire({
            title: "Message!",
            text: "Select Appointment Medicine to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (!appointmentId || !medicineId || !quantity || quantity <= 0) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        appointmentMedicineId: appointmentMedicineId,
        appointmentId: appointmentId,
        medicineId: medicineId,
        quantity: quantity
    });

    $.ajax({
        url: "/api/v1/appointmentmedicine",
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
            loadAppointmentMedicine();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update appointment medicine",
                icon: "error"
            });
        }
    });
}

//========================= Delete Appointment Medicine ===========================
function handleDelete(event) {

    event.preventDefault();

    const appointmentMedicineId = Number($('#appointmentMedicineId').val());

    if (!appointmentMedicineId) {

        Swal.fire({
            title: "Message!",
            text: "Select Row to Delete",
            icon: "warning"
        });

        return;
    }

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
                url: "/api/v1/appointmentmedicine/" + appointmentMedicineId,
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
                    loadAppointmentMedicine();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete appointment medicine",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Appointment Medicine (row click) ===============
function selectAppointmentMedicine(appointmentMedicine) {

    $('#appointmentMedicineId').val(appointmentMedicine.appointmentMedicineId);
    $('#appointmentId').val(appointmentMedicine.appointmentId);
    $('#medicineId').val(appointmentMedicine.medicineId);
    $('#quantity').val(appointmentMedicine.quantity);

    $('#formTitle').text("Edit Appointment Medicine");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ===================================
function handleCancel() {

    $("#appointmentMedicineForm")[0].reset();
    $('#appointmentMedicineId').val("0");

    $('#formTitle').text("Add Appointment Medicine");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Appointment Medicines ==========================
function loadAppointmentMedicine() {

    $.ajax({
        url: "/api/v1/appointmentmedicine",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#appointmentMedicineTableBody").empty();

            response.forEach(function (appointmentMedicine) {

                const row = `
                    <tr onclick='selectAppointmentMedicine(${JSON.stringify(appointmentMedicine)})'
                        style="cursor: pointer;">

                        <td>${appointmentMedicine.appointmentMedicineId}</td>
                        <td>Appointment #${appointmentMedicine.appointmentId}</td>
                        <td>${appointmentMedicine.medicineName}</td>
                        <td>${appointmentMedicine.quantity}</td>

                    </tr>
                `;

                $("#appointmentMedicineTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Appointment Medicine",
                icon: "error"
            });
        }
    });
}

//========================= Patient / Doctor Name Lookup ==========================
function getPatientName(patientId) {
    const patient = patientList.find(p => p.patientId === patientId);
    return patient ? patient.patientName : patientId;
}

function getDoctorName(doctorId) {
    const doctor = doctorList.find(d => d.doctorId === doctorId);
    return doctor ? doctor.doctorName : doctorId;
}

//========================= Page Init ==============================================
$(document).ready(function () {

    loadPatientList(function () {
        loadDoctorList(function () {
            loadAppointmentDropdown();
            loadAppointmentMedicine();
        });
    });

    loadMedicineDropdown();
});