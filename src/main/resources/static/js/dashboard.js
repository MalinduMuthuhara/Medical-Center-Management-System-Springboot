//========================= Load Patient / Doctor Lists (for name lookup) ==========
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

            $('#totalPatients').text(patients.length);

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

            $('#totalDoctors').text(doctors.length);

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

//========================= Load Appointments (count + recent table) ===============
function loadAppointments() {

    $.ajax({
        url: "/api/v1/appointment",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (appointments) {

            $('#totalAppointments').text(appointments.length);

            // Most recently created appointments first (no date field on Appointment yet)
            const recent = appointments
                .slice()
                .sort((a, b) => b.appointmentId - a.appointmentId)
                .slice(0, 5);

            const $tableBody = $('#recentAppointmentsTableBody');
            $tableBody.empty();

            if (recent.length === 0) {

                $tableBody.append(`
                    <tr>
                        <td colspan="5" style="text-align: center;">
                            No recent appointments
                        </td>
                    </tr>
                `);

                return;
            }

            recent.forEach(function (appointment) {

                const row = `
                    <tr>
                        <td>${appointment.appointmentId}</td>
                        <td>${getPatientName(appointment.patientId)}</td>
                        <td>Dr. ${getDoctorName(appointment.doctorId)}</td>
                        <td>N/A</td>
                        <td>N/A</td>
                    </tr>
                `;

                $tableBody.append(row);
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

//========================= Load Payments (total revenue) ===========================
function loadRevenue() {

    $.ajax({
        url: "/api/v1/payment",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (payments) {

            const total = payments.reduce((sum, payment) => sum + payment.amount, 0);

            $('#totalRevenue').text("Rs. " + total.toFixed(2));
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load payments",
                icon: "error"
            });
        }
    });
}

//========================= Patient / Doctor Name Lookup ============================
function getPatientName(patientId) {
    const patient = patientList.find(p => p.patientId === patientId);
    return patient ? patient.patientName : patientId;
}

function getDoctorName(doctorId) {
    const doctor = doctorList.find(d => d.doctorId === doctorId);
    return doctor ? doctor.doctorName : doctorId;
}

//========================= Page Init =================================================
$(document).ready(function () {

    loadPatientList(function () {
        loadDoctorList(function () {
            loadAppointments();
        });
    });

    loadRevenue();
});