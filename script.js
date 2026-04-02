const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const buttonZone = document.getElementById("button-zone");
const message = document.getElementById("message");
const celebration = document.getElementById("celebration");
const confettiLayer = document.getElementById("confetti-layer");

const playfulMessages = [
  "ayana DONT CLICK NO",
  "the yes button is better than abhishek sir's vivas bro bffr",
  "ATP EVEN RONIT WILL SAY YES",
  "NOOOOO"
];

let moveCount = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createConfetti() {
  const colors = ["#d9193a", "#1d5eea", "#ffd24f", "#ffffff"];

  confettiLayer.classList.remove("hidden");
  confettiLayer.innerHTML = "";

  for (let index = 0; index < 36; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
  }

  window.setTimeout(() => {
    confettiLayer.classList.add("hidden");
    confettiLayer.innerHTML = "";
  }, 3200);
}

function moveNoButton(pointerX, pointerY) {
  const zoneRect = buttonZone.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  const relativeX = pointerX - zoneRect.left;
  const relativeY = pointerY - zoneRect.top;
  const currentX = buttonRect.left - zoneRect.left;
  const currentY = buttonRect.top - zoneRect.top;

  const buttonCenterX = currentX + buttonRect.width / 2;
  const buttonCenterY = currentY + buttonRect.height / 2;
  const diffX = buttonCenterX - relativeX;
  const diffY = buttonCenterY - relativeY;
  const distance = Math.hypot(diffX, diffY);
  const triggerDistance = 140;

  if (distance > triggerDistance) {
    return;
  }

  const angle = Math.atan2(diffY, diffX);
  const escapeDistance = 115 + Math.random() * 45;
  const targetX = currentX + Math.cos(angle) * escapeDistance;
  const targetY = currentY + Math.sin(angle) * escapeDistance;

  const maxX = zoneRect.width - buttonRect.width;
  const maxY = zoneRect.height - buttonRect.height;
  const safeX = clamp(targetX, 0, maxX);
  const safeY = clamp(targetY, 0, maxY);

  noButton.style.left = `${safeX}px`;
  noButton.style.top = `${safeY}px`;
  noButton.style.transform = `scale(${Math.max(0.72, 1 - moveCount * 0.05)})`;
  noButton.textContent = moveCount > 3 ? "pls no" : "No";

  message.textContent = playfulMessages[moveCount % playfulMessages.length];
  moveCount += 1;
}

buttonZone.addEventListener("pointermove", (event) => {
  moveNoButton(event.clientX, event.clientY);
});

noButton.addEventListener("focus", () => {
  const zoneRect = buttonZone.getBoundingClientRect();
  moveNoButton(zoneRect.left + zoneRect.width / 2, zoneRect.top + zoneRect.height / 2);
});

yesButton.addEventListener("click", () => {
  message.textContent = "yayyy love u";
  yesButton.textContent = "you da best";
  noButton.style.opacity = "0.45";
  noButton.textContent = "too late";
  celebration.classList.remove("hidden");
  createConfetti();
});

noButton.addEventListener("click", (event) => {
  event.preventDefault();
  message.textContent = "haha loser u cant say no";
});
