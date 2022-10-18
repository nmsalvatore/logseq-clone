// autogrow textarea
const growers = document.querySelectorAll('.grow-wrap');
growers.forEach((grower) => {
  const textarea = grower.querySelector('textarea');
  textarea.addEventListener('input', () => {
    grower.dataset.replicatedValue = textarea.value;
  });
  document.addEventListener('DOMContentLoaded', () => {
    grower.dataset.replicatedValue = textarea.value;
  })
});

// toggle favorite
favoriteButton = document.getElementById('favoriteButton');
if (favoriteButton) {
    favoriteButton.addEventListener('click', e => {
        if (favoriteButton.classList.contains('is_favorite')) {
            favoriteButton.classList.remove('is_favorite');
            favoriteButton.src = '/static/icons/heart.svg';
            favoriteForm.submit();
        } else {
            favoriteButton.classList.add('is_favorite');
            favoriteButton.src = '/static/icons/heart_fill.svg';
            favoriteForm.submit();
        }
    });
}

// highlight js
hljs.highlightAll();

// modify stylesheet
light = `
  :root {
    --text-primary: #222;
    --text-secondary: #444;
    --text-tertiary: #888;
    --text-placeholder: #aaa;
    --icon-primary: invert(0%) sepia(4%) saturate(119%) hue-rotate(343deg) brightness(84%) contrast(73%);
    --icon-secondary: invert(27%) sepia(3%) saturate(0%) hue-rotate(223deg) brightness(113%) contrast(84%);
    --icon-tertiary: invert(63%) sepia(0%) saturate(0%) hue-rotate(212deg) brightness(85%) contrast(95%);
    --background-main: #fefefe;
    --background-sidebar: #f6f6f6;
}`

dark = `
  :root {
    --background-main: #222;
    --background-sidebar: #444;
    --text-primary: #fefefe;
    --text-secondary: #bebebe;
    --text-tertiary: #999;
    --text-placeholder: #777;
    --icon-primary: invert(100%) sepia(0%) saturate(0%) hue-rotate(45deg) brightness(103%) contrast(103%);
    --icon-secondary: invert(100%) sepia(0%) saturate(6014%) hue-rotate(97deg) brightness(82%) contrast(76%);
    --icon-tertiary: invert(69%) sepia(0%) saturate(1%) hue-rotate(234deg) brightness(88%) contrast(91%);
  }`

nord = `
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