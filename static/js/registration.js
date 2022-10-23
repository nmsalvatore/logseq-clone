// set placeholders on registration/login forms
const usernameField = document.getElementById('id_username');
const passwordField = document.getElementById('id_password');
const password1Field = document.querySelector('input#id_password1');
const password2Field = document.querySelector('input#id_password2');

if (usernameField) {
    usernameField.placeholder = 'Username';
}

if (passwordField) {
    passwordField.placeholder = 'Password';
}

if (password1Field && password2Field) {
    password1Field.placeholder = 'Password';
    password2Field.placeholder = 'Re-enter Password';
}

