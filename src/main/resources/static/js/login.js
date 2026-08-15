document.addEventListener('DOMContentLoaded', function () {

    const form            = document.getElementById('loginForm');
    const usernameInput   = document.getElementById('username');
    const passwordInput   = document.getElementById('password');
    const passwordField   = passwordInput.closest('.field');
    const usernameField   = usernameInput.closest('.field');
    const toggleBtn       = document.getElementById('togglePassword');
    const showPasswordChk = document.getElementById('showPasswordCheck');
    const eyeIcon         = toggleBtn.querySelector('.icon-eye');
    const eyeOffIcon      = toggleBtn.querySelector('.icon-eye-off');
    const errorLabel      = document.getElementById('errorLabel');
    const loginBtn        = document.getElementById('loginBtn');
    const btnLabel        = loginBtn.querySelector('.btn-label');
    const btnSpinner      = loginBtn.querySelector('.btn-spinner');
    const resetBtn        = document.getElementById('resetBtn');

    /* ---- Show / hide password (checkbox + eye icon both control it) ---- */
    function setPasswordVisibility(visible) {
        passwordInput.type = visible ? 'text' : 'password';
        toggleBtn.setAttribute('aria-pressed', String(visible));
        toggleBtn.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
        eyeIcon.hidden = visible;
        eyeOffIcon.hidden = !visible;
        showPasswordChk.checked = visible;
    }

    toggleBtn.addEventListener('click', function () {
        setPasswordVisibility(passwordInput.type === 'password');
    });

    showPasswordChk.addEventListener('change', function () {
        setPasswordVisibility(showPasswordChk.checked);
    });

    /* ---- Error helpers ---- */
    function showError(message) {
        errorLabel.textContent = message;
        errorLabel.hidden = false;
        usernameField.classList.add('has-error');
        passwordField.classList.add('has-error');
    }

    function clearError() {
        errorLabel.hidden = true;
        usernameField.classList.remove('has-error');
        passwordField.classList.remove('has-error');
    }

    function setLoading(isLoading) {
        loginBtn.disabled = isLoading;
        btnSpinner.hidden = !isLoading;
        btnLabel.textContent = isLoading ? 'Signing in…' : 'Login';
    }

    /* ---- Reset ---- */
    resetBtn.addEventListener('click', function () {
        clearError();
        setPasswordVisibility(false);
    });

    /* ---- Submit ---- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearError();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            showError('Please enter both username and password.');
            return;
        }

        setLoading(true);

        /* -----------------------------------------------------------------
           Replace this block with your real authentication call, e.g.:

           fetch('/api/auth/login', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ username, password })
           })
           .then(res => {
             if (!res.ok) throw new Error('Invalid username or password.');
             return res.json();
           })
           .then(data => {
             localStorage.setItem('token', data.token); // JWT
             window.location.href = 'dashboard.html';
           })
           .catch(err => showError(err.message))
           .finally(() => setLoading(false));
        ----------------------------------------------------------------- */

        setTimeout(function () {
            setLoading(false);
            showError('Invalid username or password.');
        }, 900);
    });

});