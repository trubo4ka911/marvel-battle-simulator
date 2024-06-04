export function dynamicSimulateBattle(character1, character2) {
  // Generate random battle scores for each character
  const character1Score = Math.random() * 100;
  const character2Score = Math.random() * 100;

  // Compare the scores to determine the winner
  if (character1Score > character2Score) {
    return {
      winner: character1,
      narrative: `${
        character1.name
      } wins with a score of ${character1Score.toFixed(2)} against ${
        character2.name
      } who scored ${character2Score.toFixed(2)}!`,
    };
  } else {
    return {
      winner: character2,
      narrative: `${
        character2.name
      } wins with a score of ${character2Score.toFixed(2)} against ${
        character1.name
      } who scored ${character1Score.toFixed(2)}!`,
    };
  }
}
