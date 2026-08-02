import confetti from 'canvas-confetti';

export function fireConfetti() {
  const colors = ['#598dff', '#22d3ee', '#10b981', '#f59e0b', '#f87171'];
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors,
  });
  setTimeout(() => {
    confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 }, colors });
    confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 }, colors });
  }, 200);
}
