//========================= Load Ward Dropdown ===========================
function loadWardDropdown() {

    $.ajax({
        url: "/api/v1/ward",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (wards) {

            const $dropdown = $('#wardId');

            $dropdown.empty();
            $dropdown.append('<option value="">Select Ward</option>');

            wards.forEach(function (ward) {

                $dropdown.append(
                    `<option value="${ward.wardId}">Room ${ward.roomNumber} - ${ward.type}</option>`
                );
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load wards",
                icon: "error"
            });
        }
    });
}

//========================= Save Patient ===================================
function handleSave(event) {
    event.preventDefault();

    const patientId = Number($('#patientId').val());
    const fullName = $('#fullName').val().trim();
    const age = Number($('#age').val());
    const gender = $('#gender').val();
    const address = $('#address').val().trim();
    const wardId = Number($('#wardId').val());

    // Validate fields
    if (fullName === "" || !age || gender === "" || address === "" || !wardId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Patient object
    const obj = JSON.stringify({
        patientId: patientId,
        wardId: wardId,
        patientName: fullName,
        patientAge: age,
        patientGender: gender,
        patientAddress: address
    });

    // Save patient
    $.ajax({
        url: "/api/v1/patient",
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
            loadPatient();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save patient",
                icon: "error"
            });
        }
    });
}

//========================= Update Patient ==================================
function handleUpdate(event) {

    event.preventDefault();

    const patientId = Number($('#patientId').val());
    const fullName = $('#fullName').val().trim();
    const age = Number($('#age').val());
    const gender = $('#gender').val();
    const address = $('#address').val().trim();
    const wardId = Number($('#wardId').val());

    // Check patient selection
    if (!patientId) {
        Swal.fire({
            title: "Message!",
            text: "Select Patient to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (fullName === "" || !age || gender === "" || address === "" || !wardId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        patientId: patientId,
        wardId: wardId,
        patientName: fullName,
        patientAge: age,
        patientGender: gender,
        patientAddress: address
    });

    $.ajax({
        url: "/api/v1/patient",
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
            loadPatient();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update patient",
                icon: "error"
            });
        }
    });
}

//========================= Delete Patient ==================================
function handleDelete(event) {

    event.preventDefault();

    const patientId = Number($('#patientId').val());

    // Check patient selection
    if (!patientId) {

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
                url: "/api/v1/patient/" + patientId,
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
                    loadPatient();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete patient",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Patient ===================================
function selectPatient(patient) {

    $('#patientId').val(patient.patientId);
    $('#fullName').val(patient.patientName);
    $('#age').val(patient.patientAge);
    $('#gender').val(patient.patientGender);
    $('#address').val(patient.patientAddress);
    $('#wardId').val(patient.wardId);

    $('#formTitle').text("Edit Patient");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ===============================
function handleCancel() {

    $("#patientForm")[0].reset();
    $('#patientId').val("0");

    $('#formTitle').text("Add Patient");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Patients ===================================
function loadPatient() {

    $.ajax({
        url: "/api/v1/patient",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#patientsTableBody").empty();

            response.forEach(function (patient) {

                const row = `
                    <tr onclick='selectPatient(${JSON.stringify(patient)})'
                        style="cursor: pointer;">

                        <td>${patient.patientId}</td>
                        <td>${patient.patientName}</td>
                        <td>${patient.patientAge}</td>
                        <td>${patient.patientGender}</td>
                        <td>${patient.patientAddress}</td>
                        <td>${getWardLabel(patient.wardId)}</td>

                    </tr>
                `;

                $("#patientsTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Patient",
                icon: "error"
            });
        }
    });
}

//========================= Ward Label Lookup ================================
function getWardLabel(wardId) {

    const option = $(`#wardId option[value="${wardId}"]`);
    return option.length ? option.text() : wardId;
}

//========================= Page Init =========================================
$(document).ready(function () {

    loadWardDropdown();
    loadPatient();
});