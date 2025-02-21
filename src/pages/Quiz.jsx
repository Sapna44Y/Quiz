import { useState, useEffect } from "react";
import { quizData } from "../data/quizData";
import Scoreboard from "../components/Scoreboard";
import Timer from "../components/Timer"; // Import the Timer component

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [inputAnswer, setInputAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      updateQuizHistory(null, false);
      nextQuestion();
    }
  }, [timeLeft, isAnswered]);

  const handleMultipleChoiceAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.answer;
    updateQuizHistory(answer, isCorrect);
    setIsAnswered(true);
    setFeedback(isCorrect ? "✅ Correct!" : "❌ Wrong!");
    if (isCorrect) setCorrectAnswers((prev) => prev + 1);
  };

  const handleIntegerAnswerSubmit = () => {
    const userAnswer = parseInt(inputAnswer, 10);
    if (!isNaN(userAnswer)) {
      const isCorrect = userAnswer === currentQuestion.answer;
      updateQuizHistory(userAnswer, isCorrect);
      setIsAnswered(true);
      setFeedback(
        isCorrect
          ? "✅ Correct!"
          : `❌ Wrong! The correct answer is ${currentQuestion.answer}`
      );
      if (isCorrect) setCorrectAnswers((prev) => prev + 1);
    } else {
      setFeedback("❌ Please enter a valid number.");
    }
  };

  const updateQuizHistory = (userAnswer, isCorrect) => {
    setQuizHistory((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: userAnswer !== null ? userAnswer : "No Answer",
        correctAnswer: currentQuestion.answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setInputAnswer("");
      setFeedback("");
      setTimeLeft(30);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setInputAnswer("");
    setFeedback("");
    setTimeLeft(30);
    setIsAnswered(false);
    setQuizHistory([]);
    setQuizCompleted(false);
    setCorrectAnswers(0);
    setStartTime(Date.now());
  };

  if (quizCompleted) {
    const totalTimeTaken = Math.floor((Date.now() - startTime) / 1000);
    return (
      <Scoreboard
        quizHistory={quizHistory}
        correctAnswers={correctAnswers}
        totalTimeTaken={totalTimeTaken}
        restartQuiz={restartQuiz}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 shadow-xl rounded-lg p-6">
      <div className="w-[450px] p-6">
        <h2 className="text-2xl font-bold text-blue-600 text-center">
          Question {currentQuestionIndex + 1} / {quizData.length}
        </h2>
        <p className="text-lg font-semibold text-gray-800 mt-4 text-center">
          {currentQuestion.question}
        </p>

        {/* Timer Component */}
        <div className="text-center mt-3">
          <Timer timeLeft={timeLeft} onTimeUp={() => nextQuestion()} />
        </div>

        {currentQuestion.options ? (
          <div className="grid grid-cols-2 gap-4 mt-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMultipleChoiceAnswer(option)}
                disabled={isAnswered}
                className={`p-3 text-lg font-medium border rounded-lg shadow-md transition duration-200
                  ${
                    isAnswered && option === currentQuestion.answer
                      ? "bg-green-500 text-white"
                      : "bg-white hover:bg-blue-500 hover:text-white"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center">
            <input
              type="number"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              disabled={isAnswered}
              className="p-2 border rounded-lg text-lg w-1/2 text-center"
              placeholder="Enter your answer"
            />
            <button
              onClick={handleIntegerAnswerSubmit}
              disabled={isAnswered}
              className="mt-4 px-5 py-2 text-white font-bold bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        )}

        <p
          className={`mt-6 text-lg font-bold ${
            feedback.includes("Correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </p>

        {isAnswered && (
          <div className="flex justify-center mt-6">
            <button
              onClick={nextQuestion}
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
            >
              {currentQuestionIndex === quizData.length - 1
                ? "Submit"
                : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
