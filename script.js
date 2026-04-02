const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const buttonZone = document.getElementById("button-zone");
const message = document.getElementById("message");

const playfulMessages = [
  "The no button believes in true love and cardio.",
  "It keeps running away. Very interesting."
];

let moveCount = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
  noButton.style.opacity = "0.75";
});

noButton.addEventListener("click", (event) => {
  event.preventDefault();
  message.textContent = "The no button respectfully declines being clicked.";
});
