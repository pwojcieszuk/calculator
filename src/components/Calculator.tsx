"use client";
import { ChangeEvent, useState } from "react";
import Button from "./Button";
import ResizableTextarea from "./ResizableTextarea";
import { calculateExpression } from "@/services/calculation";

const validateInput = (expression: string) => {
  const isValid = /^[\d+\-*/. ()]+$/.test(expression);
  return isValid;
};

const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operationButtons = ["+", "-", "*", "/", "."];

const isOperation = (char: string): boolean => {
    return operationButtons.includes(char);
};
  
const handleInputLogic = (currentInput: string, newValue: string): string => {
  if (currentInput.length === 0 && isOperation(newValue)) {
    return currentInput;
  }

  if (isOperation(newValue) && isOperation(currentInput[currentInput.length - 1])) {
    // Replace the last character if it is also an operation
    return currentInput.slice(0, -1) + newValue;
  } else {
    return currentInput + newValue;
  }
};

const Calculator = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleButtonClick = (value: string) => {
    setError("");
    if (value === "C") {
      setInput("");

    } else if (value === "=") {
      calculateResult();
    } else {
      setInput(handleInputLogic(input, value));
    }
  };

  const createButton = (
    label: string,
    variant: "number" | "operation" |  "reset"| "calculate",
    wide = false,
  ) => (
    <Button
      key={label}
      label={label}
      onClick={() => handleButtonClick(label)}
      variant={variant}
      wide={wide}
    />
  );

  const calculateResult = async () => {
    if (!validateInput(input)) {
      setError("Invalid input");
      return;
    }

    try {
      const response = await calculateExpression(input);
      setInput(response.result.toString());
    } catch (error) {
      console.error("Error in calculation:", error);
      setError(error ? String(error) : "Error in calculation");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        {numberButtons.map((label) => createButton(label, "number", label === "0"))}
        {operationButtons.map((label) => createButton(label, "operation"))}
        {createButton("C", 'reset', true)}
        {createButton("=", 'calculate', true)}
          </div>
          <ResizableTextarea
        value={input}
        onChange={handleInputChange}
        className="w-full p-2 border-2 border-gray-300 rounded mb-2 resize-none overflow-hidden"
        style={{ minHeight: '50px' }}
      />
      <p className="text-red-500 text-sm min-h-[1.3rem]">{error}</p>
    </div>
  );
};

export default Calculator;
