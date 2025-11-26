const toggle = document.getElementById("togglePassword");
const passwordInput = document.getElementById("account_password");

toggle.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggle.textContent = isPassword ? "Hide" : "Show";
});