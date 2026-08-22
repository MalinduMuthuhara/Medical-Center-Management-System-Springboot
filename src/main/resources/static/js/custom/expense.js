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

//========================= Save Expense ===================================
function handleSave(event) {
    event.preventDefault();

    const expenseId = Number($('#expenseId').val());
    const category = $('#category').val().trim();
    const description = $('#description').val().trim();
    const amount = Number($('#amount').val());
    const expenseDate = $('#expenseDate').val();
    const departmentId = Number($('#departmentId').val());

    // Validate fields
    if (category === "" || description === "" || !amount || expenseDate === "" || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    // Expense object
    const obj = JSON.stringify({
        expenseId: expenseId,
        departmentId: departmentId,
        category: category,
        description: description,
        amount: amount,
        expenseDate: expenseDate
    });

    // Save expense
    $.ajax({
        url: "/api/v1/expense",
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
            loadExpense();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to save expense",
                icon: "error"
            });
        }
    });
}

//========================= Update Expense ==================================
function handleUpdate(event) {

    event.preventDefault();

    const expenseId = Number($('#expenseId').val());
    const category = $('#category').val().trim();
    const description = $('#description').val().trim();
    const amount = Number($('#amount').val());
    const expenseDate = $('#expenseDate').val();
    const departmentId = Number($('#departmentId').val());

    // Check expense selection
    if (!expenseId) {
        Swal.fire({
            title: "Message!",
            text: "Select Expense to Update",
            icon: "warning"
        });
        return;
    }

    // Validate fields
    if (category === "" || description === "" || !amount || expenseDate === "" || !departmentId) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        expenseId: expenseId,
        departmentId: departmentId,
        category: category,
        description: description,
        amount: amount,
        expenseDate: expenseDate
    });

    $.ajax({
        url: "/api/v1/expense",
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
            loadExpense();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to update expense",
                icon: "error"
            });
        }
    });
}

//========================= Delete Expense ==================================
function handleDelete(event) {

    event.preventDefault();

    const expenseId = Number($('#expenseId').val());

    // Check expense selection
    if (!expenseId) {

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
                url: "/api/v1/expense/" + expenseId,
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
                    loadExpense();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete expense",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Select Expense ===================================
function selectExpense(expense) {

    $('#expenseId').val(expense.expenseId);
    $('#category').val(expense.category);
    $('#description').val(expense.description);
    $('#amount').val(expense.amount);
    $('#expenseDate').val(expense.expenseDate);
    $('#departmentId').val(expense.departmentId);

    $('#formTitle').text("Edit Expense");

    $('#saveBtn').hide();
    $('#updateBtn').show();
    $('#deleteBtn').show();
    $('#cancelBtn').show();
}

//========================= Cancel / Reset Form ===============================
function handleCancel() {

    $("#expenseForm")[0].reset();
    $('#expenseId').val("0");

    $('#formTitle').text("Add Expense");

    $('#saveBtn').show();
    $('#updateBtn').hide();
    $('#deleteBtn').hide();
    $('#cancelBtn').hide();
}

//========================= Get All Expenses ===================================
function loadExpense() {

    $.ajax({
        url: "/api/v1/expense",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (response) {

            $("#expensesTableBody").empty();

            response.forEach(function (expense) {

                const row = `
                    <tr onclick='selectExpense(${JSON.stringify(expense)})'
                        style="cursor: pointer;">

                        <td>${expense.expenseId}</td>
                        <td>${expense.category}</td>
                        <td>${expense.description}</td>
                        <td>${Number(expense.amount).toFixed(2)}</td>
                        <td>${expense.expenseDate}</td>
                        <td>${getDepartmentName(expense.departmentId)}</td>

                    </tr>
                `;

                $("#expensesTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load Expense",
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
    loadExpense();
});