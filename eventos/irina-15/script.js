// IMÁGENES DEL JUEGO
const images = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg"
];

// DUPLICAMOS PARA HACER PARES
let gameCards = [...images, ...images];

// MEZCLAR CARTAS
gameCards.sort(() => 0.5 - Math.random());

const board = document.getElementById("game-board");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// CREAR TABLERO
gameCards.forEach((imgSrc) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">
        <img src="${imgSrc}" alt="foto">
      </div>
    </div>
  `;

  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
});

// GIRAR CARTA
function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

// VERIFICAR MATCH
function checkMatch() {
  const img1 = firstCard.querySelector("img").src;
  const img2 = secondCard.querySelector("img").src;

  if (img1 === img2) {
    resetTurn();
  } else {
    lockBoard = true;
    setTimeout(() => {
