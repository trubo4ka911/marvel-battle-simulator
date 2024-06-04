export function simulateBattle(contender1, contender2) {
  const contenders = [contender1, contender2];
  const winner = contenders[Math.floor(Math.random() * contenders.length)];
  return winner;
}
