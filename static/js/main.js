// constants
const favoriteButton = document.getElementById('favoriteButton');
const formFavoriteButton = document.getElementById('formFavoriteButton');
const growers = document.querySelectorAll('.grow-wrap');
const textarea = document.querySelector('.grow-wrap > textarea')
const saveButton = document.getElementById('saveButton');
const menuButton = document.getElementById('menuButton');

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
      } else {
          favoriteButton.classList.add('is_favorite');
          favoriteButton.src = '/static/icons/heart_fill.svg';
      }
    });
}

if (formFavoriteButton) {
    formFavoriteButton.addEventListener('click', e=> {
      if (formFavoriteButton.classList.contains('is_favorite')) {
        formFavoriteButton.classList.remove('is_favorite');
        formFavoriteButton.src = '/static/icons/heart.svg';
        favoriteInput.querySelector('select').value = 'false';
        form
      } else {
        formFavoriteButton.classList.add('is_favorite');
        formFavoriteButton.src = '/static/icons/heart_fill.svg';
        favoriteInput.querySelector('select').value = 'true';
      }
    });
}

// highlight js
hljs.highlightAll();

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

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const navContent = document.querySelector('nav.navbar .content');
    if (navContent.classList.contains('hide-mobile-content')) {
      navContent.classList.remove('hide-mobile-content');
    } else {
      navContent.classList.add('hide-mobile-content');
    }
  });
}
