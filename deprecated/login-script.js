const form = document.getElementById("login-form");
const userInput = document.getElementById("user-input");
const passwordInput = document.getElementById("password-input");

const users = [
    {
        name: "leo",
        password: "123",
    },
    {
        name: "andi",
        password: "123",
    },
    {
        name: "chris",
        password: "123",
    },
];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = users.some(user => user.name === userInput.value.toLowerCase() && user.password === passwordInput.value);

    if (isValid) {
        window.location.href = `home.html`;
        return;
    }

    alert('Wrong Credentials!');
});
