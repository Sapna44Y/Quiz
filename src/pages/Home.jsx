import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Title */}
      <h1 className="text-5xl font-bold text-black drop-shadow-md hover:drop-shadow-xl transition-shadow duration-300">
        📚 Welcome to the{" "}
        <span className="text-green-600">Ultimate Quiz Challenge!</span> 🎯
      </h1>

      {/* Subtitle */}
      <p className="text-lg font-semibold text-gray-700 mt-4">
        Sharpen your skills and test your knowledge with fun and interactive
        quizzes.
      </p>

      {/* Quiz Instructions */}
      <div className="pt-5 hover:">
        <h2 className="text-2xl font-bold text-gray-800 underline decoration-blue-500 mb-3">
          📌 Quiz Instructions
        </h2>
        <ul className="text-left text-gray-700 list-disc pl-6 space-y-2">
          <li>
            📝 For multiple-choice questions, select the best answer (A, B, C,
            or D).
          </li>
          <li>
            🔢 For integer-type questions, write your numerical answer clearly.
          </li>
          <li>🚫 No calculators unless specified.</li>
          <li>
            ⏳ You have <strong>30 minutes</strong> to complete this quiz.
          </li>
        </ul>
      </div>

      {/* Start Quiz Button */}
      <Link
        to="/quiz"
        className="mt-6 m-0 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-700"
      >
        🚀 Start Quiz
      </Link>
    </div>
  );
};

export default Home;

//
