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