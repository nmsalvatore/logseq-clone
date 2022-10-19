// constants
const favoriteButton = document.getElementById('favoriteButton');
const growers = document.querySelectorAll('.grow-wrap');
const textarea = document.querySelector('.grow-wrap > textarea')
const saveButton = document.getElementById('saveButton');

// autogrow textarea
if (growers) {
  growers.forEach((grower) => {
    const textarea = grower.querySelector('textarea');
    textarea.addEventListener('input', () => {
      grower.dataset.replicatedValue = textarea.value;
    });
    document.addEventListener('DOMContentLoaded', () => {
      grower.dataset.replicatedValue = textarea.value;
    })
  });
}

// toggle favorite
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
const light = `
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

const dark = `
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

// remove list style type from li that has ul
const liElements = document.querySelectorAll('li');
for (li of liElements) {
  try {
    if (li.firstElementChild.tagName == 'UL') {
      li.style.listStyleType = 'none';
    }
  } catch {
    continue
  }
}

// scroll to the bottom of the page if selection cursor is at end of textarea field
if (textarea) {
  textarea.addEventListener('keydown', () => {
    if (textarea.selectionEnd == textarea.value.length) {
      growWrap = document.querySelector('.grow-wrap');
      window.scrollTo(0, growWrap.scrollHeight + 16);
    }
  });
}

// check for unsaved changes before leaving new/edit entry page
if (textarea) {
  savedContent = textarea.value
}

let saveButtonClicked = false
if (saveButton) {
  saveButton.addEventListener('click', () => {
    saveButtonClicked = true
  });
}

window.addEventListener('beforeunload', e => {
  if (savedContent != textarea.value && !saveButtonClicked) {
    e.returnValue = 'Changes you made may not be saved.'
  }
});