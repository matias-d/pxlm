import confetti from "canvas-confetti";

export function Confetti() {
  confetti({
    particleCount: Math.floor(200 * 0.25),
    spread: 26,
    origin: { y: 0.7 },
    startVelocity: 55,
  });
}
