//========================= Apply saved theme immediately (before first paint) ======
// Runs as soon as this script loads (placed in <head>) so there is no flash
// of the light theme before the dark theme is applied.
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    syncThemeToggle(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
}

// Keeps the Settings page switch in sync with the current theme
function syncThemeToggle(theme) {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.checked = theme === 'dark';
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const savedTheme = localStorage.getItem('theme') || 'light';
    syncThemeToggle(savedTheme);

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('change', toggleTheme);
    }
});