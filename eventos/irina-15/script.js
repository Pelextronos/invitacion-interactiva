const images = [
  'img/foto1.jpg',
  'img/foto2.jpg',
  'img/foto3.jpg'
];

let cards = [...images, ...images];
cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('game');
let firstCard = null;
let lock = false;
let matches = 0;

cards.forEach(src => {
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = src;

  card.appendChild(img);
  gameBoard.appendChild(card);

  card.addEventListener('click', () => {
    if (lock || card === firstCard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      if (firstCard.querySelector('img').src === img.src) {
        matches++;
        firstCard = null;

        if (matches === images.length) {
          setTimeout(showInvitation, 600);
        }
      } else {
        lock = true;
        setTimeout(() => {
          card.classList.remove('flipped');
          firstCard.classList.remove('flipped');
          firstCard = null;
          lock = false;
        }, 800);
      }
    }
  });
});

function showInvitation() {
  document.getElementById('game').style.display = 'none';
  document.querySelector('.subtitle').style.display = 'none';
  document.getElementById('invitation').classList.remove('hidden');
}
