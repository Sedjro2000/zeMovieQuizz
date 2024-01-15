import React from "react";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen = ({ score, onRestart }: GameOverScreenProps) => {
  return (
    <div>
      <h2>Game Over!</h2>
      <p>Your Score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOverScreen;
