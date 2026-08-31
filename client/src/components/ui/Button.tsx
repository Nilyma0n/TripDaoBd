import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-blue-700 hover:bg-blue-800 duration-300 text-white px-6 py-3 rounded-xl font-semibold">
      {children}
    </button>
  );
};

export default Button;