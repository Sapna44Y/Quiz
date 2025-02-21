const QuizHistory = ({ quizHistory }) => {
  return (
    <div className="quiz-history">
      {quizHistory.map((attempt, index) => (
        <div key={index} className="quiz-attempt">
          <h4>📅 {attempt.date}</h4>
          <p>
            Score: {attempt.score}/{attempt.totalQuestions}
          </p>
          <ul>
            {attempt.details.map((q, i) => (
              <li key={i}>
                <strong>
                  Q{i + 1}: {q.question}
                </strong>
                <br />✅ Correct Answer: {q.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizHistory;
