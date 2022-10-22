const nord = `
  :root {
    --background-main: #002b36;
    --background-sidebar: #023643;
    --text-primary: #93a1a1;
    --text-secondary: #dfdfdf;
    --text-tertiary: #a4b5b6;;
    --text-placeholder: #32555e;
    --icon-primary: invert(91%) sepia(5%) saturate(574%) hue-rotate(134deg) brightness(78%) contrast(90%);
    --icon-secondary: invert(100%) sepia(0%) saturate(6825%) hue-rotate(55deg) brightness(121%) contrast(75%);
    --icon-tertiary: var(--icon-primary);
  }
`

const setTheme = theme => {
  sheet = document.styleSheets[0];
  sheet.deleteRule(0);
  sheet.insertRule(theme);
}

setTheme(nord)


// set placeholders on registration/login forms
const usernameField = document.getElementById('id_username');
const passwordField = document.getElementById('id_password');
const password1Field = document.getElementById('id_password1');
const password2Field = document.getElementById('id_password2');
usernameField.placeholder = 'Username';
passwordField.placeholder = 'Password';
password1Field.placeholder = 'Password';
password2Field.placeholder = 'Re-enter Password';

