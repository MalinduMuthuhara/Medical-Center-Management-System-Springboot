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

//========================= Preview Auto-Calculated Amount ======================
// amount = 2500 (base fee) + Σ(quantity * medicine price), fetched from the server
function previewAmount() {

    const appointmentId = Number($('#appointmentId').val());

    if (!appointmentId) {
        $('#amount').val("");
        return;
    }

    $.ajax({
        url: "/api/v1/payment/calculate/" + appointmentId,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (amount) {
            $('#amount').val(amount.toFixed(2));
        },

        error: function (xhr) {
            $('#amount').val("");
            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to calculate amount",
                icon: "error"
            });
        }
    });
}

//========================= Save Payment =========================================
function handleSave(event) {
    event.preventDefault();

    const appointmentId = Number($('#appointmentId').val());

    // Validate fields
    if (!appointmentId) {
        Swal.fire({
            title: "Message!",
            text: "Select an Appointment",
            icon: "warning"
        });
        return;
    }

    // amount is calculated server-side; the value sent here is ignored by the backend
    const obj = JSON.stringify({
        paymentId: 0,
        appointmentId: appointmentId,
        amount: 0
    });

    $.ajax({
        url: "/api/v1/payment",
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
            loadPayment();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save payment",
                icon: "error"
            });
        }
    });
}

//========================= Update Payment =======================================
function handleUpdate(event) {

    event.preventDefault();

    const paymentId = Number($('#paymentId').val());
    const appointmentId = Number($('#appointmentId').val());

    if (!paymentId) {
        Swal.fire({
            title: "Message!",
            text: "Select Payment to Update",
            icon: "warning"
        });
        return;
    }

    if (!appointmentId) {
        Swal.fire({
            title: "Message!",
            text: "Select an Appointment",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        paymentId: paymentId,
        appointmentId: appointmentId,
        amount: 0
    });

    $.ajax({
        url: "/api/v1/payment",
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
            loadPayment();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update payment",
                icon: "error"
            });
        }
    });
}

//========================= Delete Payment ========================================
function handleDelete(event) {

    event.preventDefault();

    const paymentId = Number($('#paymentId').val());

    if (!paymentId) {

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
                url: "/api/v1/payment/" + paymentId,
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
                    loadPayment();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete payment",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Payment (row click) ============================
function selectPayment(payment) {

    $('#paymentId').val(payment.paymentId);
    $('#appointmentId').val(payment.appointmentId);
    $('#amount').val(payment.amount.toFixed(2));

    $('#formTitle').text("Edit Payment");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ====================================
function handleCancel() {

    $("#paymentForm")[0].reset();
    $('#paymentId').val("0");
    $('#amount').val("");

    $('#formTitle').text("Add Payment");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Payments =======================================
function loadPayment() {

    $.ajax({
        url: "/api/v1/payment",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#paymentTableBody").empty();

            response.forEach(function (payment) {

                const row = `
                    <tr onclick='selectPayment(${JSON.stringify(payment)})'
                        style="cursor: pointer;">

                        <td>${payment.paymentId}</td>
                        <td>Appointment #${payment.appointmentId}</td>
                        <td>Rs. ${payment.amount.toFixed(2)}</td>

                    </tr>
                `;

                $("#paymentTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Payments",
                icon: "error"
            });
        }
    });
}

//========================= Patient / Doctor Name Lookup ===========================
function getPatientName(patientId) {
    const patient = patientList.find(p => p.patientId === patientId);
    return patient ? patient.patientName : patientId;
}

function getDoctorName(doctorId) {
    const doctor = doctorList.find(d => d.doctorId === doctorId);
    return doctor ? doctor.doctorName : doctorId;
}

//========================= Page Init ===============================================
$(document).ready(function () {

    loadPatientList(function () {
        loadDoctorList(function () {
            loadAppointmentDropdown();
            loadPayment();
        });
    });

    // Recalculate the preview amount whenever the appointment selection changes
    $('#appointmentId').on('change', previewAmount);
});