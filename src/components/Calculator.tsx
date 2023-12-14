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
    <div className="max-w-xs mx-auto mt-10 p-5 border-2 border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Calculator</h1>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {buttons.map((button, idx) => (
          <button
            key={idx}
            className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border-2 border-gray-300 rounded mb-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Calculator;
