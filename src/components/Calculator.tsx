"use client";
import { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const buttons = ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "C", "0", "=", "/"];

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput("");
      setError("");
    } else if (value === "=") {
      calculateResult();
    } else {
      setInput(input + value);
    }
  };

  const validateInput = (expression: string) => {
    // Simple validation rule: Only numbers and +, -, *, / are allowed
    const isValid = /^[\d+\-*/ ()]+$/.test(expression);
    return isValid;
  };

  const calculateResult = async () => {
    if (!validateInput(input)) {
      setError("Invalid input");
      return;
    }

    try {
      const response = await Promise.resolve({ data: { result: 42 } }); // TODO: Replace with actual calculation
      setInput(response.data.result.toString());
    } catch (error) {
      console.error("Error in calculation:", error);
      setError("Error in calculation");
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <div>
        {buttons.map((button, idx) => (
          <button key={idx} onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Calculator;
