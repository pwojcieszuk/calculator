"use client";
import { ChangeEvent, SyntheticEvent, useState } from "react";

const validateInput = (expression: string) => {
  const isValid = /^[\d+\-*/. ()]+$/.test(expression);
  return isValid;
};

const Calculator = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operationButtons = ["+", "-", "*", "/", "."];

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateInput(value)) {
      setInput(value);
      setError(""); // Clear any existing error when the input is valid
    } else {
      setError("Invalid character");
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-10 p-5 border-2 border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Calculator</h1>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {numberButtons.map((button, idx) => (
          <button
            key={idx}
            className={`bg-gray-200 text-black font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              button === "0" ? "col-span-2" : ""
            }`}
            onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
        {operationButtons.map((button, idx) => (
          <button
            key={idx}
            className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
        <button
          className="bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={() => handleButtonClick("C")}>
          C
        </button>
        <button
          className="bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => handleButtonClick("=")}>
          =
        </button>
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="w-full p-2 border-2 border-gray-300 rounded mb-2 overflow-auto"
      />
      <p className="text-red-500 text-sm min-h-[1.3rem]">{error}</p>
    </div>
  );
};

export default Calculator;
