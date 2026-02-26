// CONFIGURACIÓN FECHA EVENTO
const eventDate = new Date("January 25, 2026 20:00:00").getTime();

const countdownElement = document.getElementById("countdown");

const interval = setInterval(() => {

  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    clearInterval(interval);
    countdownElement.innerHTML = "🎉 ¡Ya comenzó la fiesta!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;

}, 1000);
