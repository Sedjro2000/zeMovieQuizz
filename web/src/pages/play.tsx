import React, { useState } from "react";
import StartButton from "../components/StartButton";
import QuestionCard from "../components/QuestionCard";
import GameOverScreen from "../components/GameOverScreen";

const Play = () => {

  const [gameStarted, setGameStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswered, setUserAnswered] = useState(false);

  // Logique du bouton de démarrage
  const handleStartGame = () => {
    setGameStarted(true);
    setUserAnswered(false);
    setQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  // Logique de gestion des réponses
  const handleAnswer = async (isCorrect: boolean) => {
    if (!userAnswered) {
      setUserAnswered(true);
      const response = await submitAnswer({
        variables: { questionId: data?.play.questions[questionIndex].id, isCorrect },
      });
      if (response.data?.submitAnswer.isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      if (questionIndex + 1 < data?.play.questions.length) {
        setTimeout(() => {
          setUserAnswered(false);
          setQuestionIndex((prevIndex) => prevIndex + 1);
        }, 1000);
      } else {
        setGameOver(true);
      }
    }
  };

  return (
    <div>
      {gameStarted ? (
        gameOver ? (
          <GameOverScreen score={score} onRestart={handleStartGame} />
        ) : (
          <QuestionCard
            movieTitle={data?.play.questions[questionIndex].movie.title || ""}
            actorName={data?.play.questions[questionIndex].actor.name || ""}
            onAnswer={handleAnswer}
          />
        )
      ) : (
        <StartButton onClick={handleStartGame} />
      )}
    </div>
  );
};

export default Play;
