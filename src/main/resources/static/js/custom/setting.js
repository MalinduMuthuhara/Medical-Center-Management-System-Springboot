//========================= Load Logged-In User Info ================================
function loadAccountInfo() {

    const username = localStorage.getItem("username") || "Unknown";
    const role = localStorage.getItem("role") || "Unknown";

    $('#accountUsername').text(username);
    $('#accountRole').text(role);

    // Only Admins can manage other user accounts
    if (role === "ADMIN") {
        $('#userManagementSection').show();
        loadUsers();
    } else {
        $('#userManagementSection').hide();
    }
}

//========================= Change Password ==========================================
function handleChangePassword(event) {
    event.preventDefault();

    const oldPassword = $('#oldPassword').val();
    const newPassword = $('#newPassword').val();
    const confirmPassword = $('#confirmPassword').val();

    if (!oldPassword || !newPassword || !confirmPassword) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    if (newPassword !== confirmPassword) {
        Swal.fire({
            title: "Message!",
            text: "New Password and Confirm Password Do Not Match",
            icon: "warning"
        });
        return;
    }

    // JWT payload carries the userId claim; decode it to avoid a separate lookup call
    const userId = getUserIdFromToken();

    if (!userId) {
        Swal.fire({
            title: "Error!",
            text: "Could not identify the logged-in user. Please log in again.",
            icon: "error"
        });
        return;
    }

    const obj = JSON.stringify({
        userId: userId,
        oldPassword: oldPassword,
        newPassword: newPassword
    });

    $.ajax({
        url: "/api/v1/user/change-password",
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

            $("#changePasswordForm")[0].reset();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to change password",
                icon: "error"
            });
        }
    });
}

//========================= Add User (Admin only) =====================================
function handleAddUser(event) {
    event.preventDefault();

    const userName = $('#newUserName').val().trim();
    const password = $('#newUserPassword').val();
    const userRole = $('#newUserRole').val();

    if (!userName || !password || !userRole) {
        Swal.fire({
            title: "Message!",
            text: "Fill All Fields",
            icon: "warning"
        });
        return;
    }

    const obj = JSON.stringify({
        userId: 0,
        userName: userName,
        password: password,
        userRole: userRole
    });

    $.ajax({
        url: "/api/v1/user",
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

            $("#addUserForm")[0].reset();
            loadUsers();
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to add user",
                icon: "error"
            });
        }
    });
}

//========================= Delete User (Admin only) ===================================
function handleDeleteUser(userId) {

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
                url: "/api/v1/user/" + userId,
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

                    loadUsers();
                },

                error: function (xhr) {

                    Swal.fire({
                        title: "Error!",
                        text: xhr.responseText || "Failed to delete user",
                        icon: "error"
                    });
                }
            });
        }
    });
}

//========================= Load All Users (Admin only) =================================
function loadUsers() {

    $.ajax({
        url: "/api/v1/user",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },
        dataType: "json",

        success: function (users) {

            $("#userTableBody").empty();

            users.forEach(function (user) {

                const row = `
                    <tr>
                        <td>${user.userId}</td>
                        <td>${user.userName}</td>
                        <td>${user.userRole}</td>
                        <td>
                            <button type="button" class="btn btn-danger" onclick="handleDeleteUser(${user.userId})">
                                <i class="fa-solid fa-trash"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

                $("#userTableBody").append(row);
            });
        },

        error: function (xhr) {

            Swal.fire({
                title: "Error!",
                text: xhr.responseText || "Failed to load users",
                icon: "error"
            });
        }
    });
}

//========================= JWT Decode Helper ============================================
function getUserIdFromToken() {

    const token = localStorage.getItem("JWT");
    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = decodeURIComponent(
            atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        const payload = JSON.parse(payloadJson);
        return payload.userId || null;
    } catch (e) {
        return null;
    }
}

//========================= Page Init =====================================================
$(document).ready(function () {
    loadAccountInfo();
});