const emailField = document.getElementById("email-field");
const passwordField = document.getElementById("password-field");
const loginForm = document.getElementById("login-form");
const loginButtonText = document.getElementById("login-btn-text");
const loadingFeedback = document.getElementById("loader");

const users = [{ email: "user@user.com", password: "1234" }];

function handleSubmitForm(event) {
    event.preventDefault();
    loadingFeedback.classList.remove("d-none");
    loginButtonText.classList.add("d-none");

    const timeout = setTimeout(() => {
        loadingFeedback.classList.add("d-none");
        loginButtonText.classList.remove("d-none");

        if (
            users.some(
                (u) =>
                    u.email === emailField.value &&
                    u.password === passwordField.value
            )
        ) {
            window.location.href = "player.html";
        } else {
            alert("Usuário ou senha incorretos.");
            emailField.value = "";
            passwordField.value = "";
            emailField.focus();
        }
        clearTimeout(timeout);
    }, 1000);
}

loginForm.addEventListener("submit", handleSubmitForm);
