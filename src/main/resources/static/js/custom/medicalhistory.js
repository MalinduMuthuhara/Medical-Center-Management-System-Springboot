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

//========================= Save Medical History =============================
function handleSave(event) {
    event.preventDefault();

    const historyId = Number($('#historyId').val());
    const patientId = Number($('#patientId').val());
    const details = $('#details').val().trim();

    // Validate fields
    if (!patientId || details === "") {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Medical History object
    const obj = JSON.stringify({
        historyId: historyId,
        patientId: patientId,
        details: details
    });

    // Save medical history
    $.ajax({
        url: "/api/v1/medicalhistory",
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
            loadMedicalHistory();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save medical history",
                icon: "error"
            });
        }
    });
}

//========================= Update Medical History ============================
function handleUpdate(event) {

    event.preventDefault();

    const historyId = Number($('#historyId').val());
    const patientId = Number($('#patientId').val());
    const details = $('#details').val().trim();

    // Check medical history selection
    if (!historyId) {
        Swal.fire({
            title: "Message!",
            text: "Select Medical History to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (!patientId || details === "") {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        historyId: historyId,
        patientId: patientId,
        details: details
    });

    $.ajax({
        url: "/api/v1/medicalhistory",
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
            loadMedicalHistory();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update medical history",
                icon: "error"
            });
        }
    });
}

//========================= Delete Medical History ============================
function handleDelete(event) {

    event.preventDefault();

    const historyId = Number($('#historyId').val());

    // Check medical history selection
    if (!historyId) {

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
                url: "/api/v1/medicalhistory/" + historyId,
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
                    loadMedicalHistory();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete medical history",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Medical History =============================
function selectMedicalHistory(history) {

    $('#historyId').val(history.historyId);
    $('#patientId').val(history.patientId);
    $('#details').val(history.details);

    $('#formTitle').text("Edit Medical History");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form =============================
function handleCancel() {

    $("#medicalHistoryForm")[0].reset();
    $('#historyId').val("0");

    $('#formTitle').text("Add Medical History");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Medical Histories =========================
function loadMedicalHistory() {

    $.ajax({
        url: "/api/v1/medicalhistory",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#medicalHistoryTableBody").empty();

            response.forEach(function (history) {

                const row = `
                    <tr onclick='selectMedicalHistory(${JSON.stringify(history)})'
                        style="cursor: pointer;">

                        <td>${history.historyId}</td>
                        <td>${getPatientName(history.patientId)}</td>
                        <td>${history.details}</td>

                    </tr>
                `;

                $("#medicalHistoryTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Medical History",
                icon: "error"
            });
        }
    });
}

//========================= Patient Name Lookup ==============================
function getPatientName(patientId) {

    const option = $(`#patientId option[value="${patientId}"]`);
    return option.length ? option.text() : patientId;
}

//========================= Page Init =========================================
$(document).ready(function () {

    loadPatientDropdown();
    loadMedicalHistory();
});