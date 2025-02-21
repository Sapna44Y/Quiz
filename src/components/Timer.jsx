import { useState, useEffect } from "react";

const Timer = ({ timeLeft, onTimeUp }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => setBlink((prev) => !prev), 500); // Blink effect
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  // Determine color based on time left
  let textColor = "text-green-500";
  if (timeLeft <= 10) textColor = "text-yellow-500";
  if (timeLeft <= 5)
    textColor = blink ? "text-red-500 opacity-50" : "text-red-500"; // Blink effect

  return (
    <p className={`text-lg font-bold ${textColor} transition-all`}>
      ⏳ Time Remaining: {timeLeft}s
    </p>
  );
};

export default Timer;
