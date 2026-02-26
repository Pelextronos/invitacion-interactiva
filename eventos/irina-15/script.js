document.addEventListener("DOMContentLoaded", function () {

  // ===============================
  // IMÁGENES
  // ===============================
  const images = [
    "img/foto1.jpg",
    "img/foto2.jpg",
    "img/foto3.jpg"
  ];

  let cardsArray = [...images, ...images];
  cardsArray.sort(() => 0.5 - Math.random());

  const board = document.getElementById("game-board");
  const gameSection = document.getElementById("game-section");
  const eventSection = document.getElementById("event-section");

  if (!board) {
    console.error("No se encontró #game-board");
    return;
  }

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matches = 0;

  // ===============================
  // CREAR TABLERO
  // ===============================
  cardsArray.forEach((imgSrc) => {

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

  // ===============================
  // LÓGICA DEL JUEGO
  // ===============================

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

  function checkMatch() {

    const img1 = firstCard.querySelector("img").src;
    const img2 = secondCard.querySelector("img").src;

    if (img1 === img2) {

      matches++;
      resetTurn();

      if (matches === 3) {
        winGame();
      }

    } else {

      lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetTurn();
      }, 900);
    }
  }

  function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  function winGame() {

    setTimeout(() => {
      gameSection.classList.add("hidden");
      eventSection.classList.remove("hidden");
      startCountdown();
    }, 700);
  }

  // ===============================
  // CUENTA REGRESIVA
  // ===============================

  function startCountdown() {

    const eventDate = new Date("January 25, 2026 20:00:00").getTime();
    const countdownElement = document.getElementById("countdown");

    const interval = setInterval(() => {

      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        countdownElement.innerHTML = "🎉 ¡La fiesta comenzó!";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

    }, 1000);
  }

});
