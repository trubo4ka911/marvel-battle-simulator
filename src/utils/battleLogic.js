// src/utils/battleLogic.js
export function simulateBattle(contender1, contender2) {
  // Simple battle logic, could be expanded based on character stats
  const contenders = [contender1, contender2];
  const winner = contenders[Math.floor(Math.random() * contenders.length)];
  return winner;
}
