import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import QuizHistory from "./components/QuizHistory";

const App = () => {
  return (
    <Router>
      <div className="p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/history" element={<QuizHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
