const Scoreboard = ({ quizHistory, restartQuiz }) => {
  // Calculate the total score
  const totalMarks = quizHistory.filter((entry) => entry.isCorrect).length;
  const totalQuestions = quizHistory.length;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-5">
        📊 Quiz Results
      </h2>

      {/* Display Total Marks */}
      <p className="text-2xl font-semibold text-center text-gray-800 mb-4">
        🏆 Total Score: {totalMarks} / {totalQuestions}
      </p>

      <ul className="space-y-4">
        {quizHistory.map((entry, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              <strong>Q{index + 1}:</strong> {entry.question}
            </p>
            <p className="text-gray-700">
              📝 <strong>Your Answer:</strong> {entry.userAnswer}
            </p>
            <p className="text-green-700 font-semibold">
              ✅ <strong>Correct Answer:</strong> {entry.correctAnswer}
            </p>
            <p
              className={`font-bold ${
                entry.isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {entry.isCorrect ? "🎉 Correct!" : "❌ Wrong!"}
            </p>
          </li>
        ))}
      </ul>

      {/* Restart Quiz Button */}
      <button
        onClick={restartQuiz}
        className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300"
      >
        🔄 Restart Quiz
      </button>
    </div>
  );
};

export default Scoreboard;
