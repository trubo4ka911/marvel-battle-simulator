// src/utils/battleLogic.js
export function simulateBattle(contenders) {
  // Simple battle logic, could be expanded based on character stats
  const winner = contenders[Math.floor(Math.random() * contenders.length)];
  return winner;
}
