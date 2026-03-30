import React from "react";

interface QuestionCardProps {
  movieTitle: string;
  actorName: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionCard = ({ movieTitle, actorName, onAnswer }: QuestionCardProps) => {
  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h2>{movieTitle}</h2>
      <p>Did {actorName} play in this movie?</p>
      <button onClick={() => handleAnswer(true)}>Yes</button>
      <button onClick={() => handleAnswer(false)}>No</button>
    </div>
  );
};

export default QuestionCard;
