import clsx from "clsx";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "number" | "operation" | "reset" | "calculate";
    wide?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "number", wide = false }) => {
  const className = clsx("font-semibold py-2 rounded focus:outline-none focus:ring-2", {
    "col-span-2": wide,
    "bg-gray-200 text-black hover:bg-gray-300 focus:ring-blue-300": variant === "number",
    "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300": variant === "operation",
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300": variant === "reset",
        "bg-green-500 text-white hover:bg-green-600 focus:ring-green-300": variant === "calculate",
  });

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
