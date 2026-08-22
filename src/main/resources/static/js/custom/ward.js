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

//========================= Save Ward =====================================
function handleSave(event) {
    event.preventDefault();

    const wardId = Number($('#wardId').val());
    const roomNumber = $('#roomNumber').val().trim();
    const type = $('#wardType').val().trim();
    const capacity = Number($('#capacity').val());
    const departmentId = Number($('#departmentId').val());

    // Validate fields
    if (roomNumber === "" || type === "" || !capacity || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Ward object
    const obj = JSON.stringify({
        wardId: wardId,
        departmentId: departmentId,
        roomNumber: roomNumber,
        type: type,
        capacity: capacity
    });

    // Save ward
    $.ajax({
        url: "/api/v1/ward",
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
            loadWard();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save ward",
                icon: "error"
            });
        }
    });
}

//========================= Update Ward ====================================
function handleUpdate(event) {

    event.preventDefault();

    const wardId = Number($('#wardId').val());
    const roomNumber = $('#roomNumber').val().trim();
    const type = $('#wardType').val().trim();
    const capacity = Number($('#capacity').val());
    const departmentId = Number($('#departmentId').val());

    // Check ward selection
    if (!wardId) {
        Swal.fire({
            title: "Message!",
            text: "Select Ward to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (roomNumber === "" || type === "" || !capacity || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        wardId: wardId,
        departmentId: departmentId,
        roomNumber: roomNumber,
        type: type,
        capacity: capacity
    });

    $.ajax({
        url: "/api/v1/ward",
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
            loadWard();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update ward",
                icon: "error"
            });
        }
    });
}

//========================= Delete Ward ====================================
function handleDelete(event) {

    event.preventDefault();

    const wardId = Number($('#wardId').val());

    // Check ward selection
    if (!wardId) {

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
                url: "/api/v1/ward/" + wardId,
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
                    loadWard();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete ward",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Ward =====================================
function selectWard(ward) {

    $('#wardId').val(ward.wardId);
    $('#roomNumber').val(ward.roomNumber);
    $('#wardType').val(ward.type);
    $('#capacity').val(ward.capacity);
    $('#departmentId').val(ward.departmentId);

    $('#formTitle').text("Edit Ward");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form =============================
function handleCancel() {

    $("#wardForm")[0].reset();
    $('#wardId').val("0");

    $('#formTitle').text("Add Ward");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Wards ====================================
function loadWard() {

    $.ajax({
        url: "/api/v1/ward",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#wardsTableBody").empty();

            response.forEach(function (ward) {

                const row = `
                    <tr onclick='selectWard(${JSON.stringify(ward)})'
                        style="cursor: pointer;">

                        <td>${ward.wardId}</td>
                        <td>${ward.roomNumber}</td>
                        <td>${ward.type}</td>
                        <td>${ward.capacity}</td>
                        <td>${getDepartmentName(ward.departmentId)}</td>

                    </tr>
                `;

                $("#wardsTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Ward",
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
    loadWard();
});