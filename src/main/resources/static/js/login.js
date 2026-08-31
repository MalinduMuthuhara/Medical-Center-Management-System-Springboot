$(function () {

    const $form = $("#loginForm");
    const $errorLabel = $("#errorLabel");
    const $loginBtn = $("#loginBtn");
    const $btnLabel = $loginBtn.find(".btn-label");
    const $btnSpinner = $loginBtn.find(".btn-spinner");

    // Show/hide password
    $("#showPasswordCheck").on("change", function () {
        const type = this.checked ? "text" : "password";
        $("#password").attr("type", type);
    });

    $("#togglePassword").on("click", function () {
        const $password = $("#password");
        const showing = $password.attr("type") === "text";
        $password.attr("type", showing ? "password" : "text");
        $(this).attr("aria-pressed", String(!showing));
        $(this).find(".icon-eye").attr("hidden", !showing ? null : true);
        $(this).find(".icon-eye-off").attr("hidden", showing ? null : true);
    });

    // If already logged in, skip straight to the right dashboard
    const existingToken = localStorage.getItem("JWT");
    const existingRole = localStorage.getItem("role");
    if (existingToken && existingRole) {
        window.location.href = existingRole === "CASHIER" ? "sidebar2.html" : "sidebar.html";
        return;
    }

    $form.on("submit", function (e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val();

        $errorLabel.attr("hidden", true);

        if (!username || !password) {
            $errorLabel.text("Please enter both username and password.").removeAttr("hidden");
            return;
        }

        setLoading(true);

        $.ajax({
            url: "/api/v1/auth/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username: username, password: password }),
            dataType: "json",

            success: function (response) {
                // JWTResponseDTO: { token, username, userRole }
                localStorage.setItem("JWT", response.token);
                localStorage.setItem("username", response.username);
                localStorage.setItem("role", response.userRole);

                window.location.href = response.userRole === "CASHIER"
                    ? "sidebar2.html"
                    : "sidebar.html";
            },

            error: function (xhr) {
                setLoading(false);

                let message = "Invalid username or password.";
                if (xhr.status !== 401 && xhr.responseText) {
                    message = "Failed to Login: " + xhr.responseText;
                }
                $errorLabel.text(message).removeAttr("hidden");
            }
        });
    });

    $("#resetBtn").on("click", function () {
        $errorLabel.attr("hidden", true);
    });

    function setLoading(isLoading) {
        $loginBtn.prop("disabled", isLoading);
        $btnLabel.attr("hidden", isLoading ? true : null);
        $btnSpinner.attr("hidden", isLoading ? null : true);
    }
});