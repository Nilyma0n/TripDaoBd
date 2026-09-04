import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-amber text-ink hover:bg-amber-dark",
  secondary:
    "border border-ink/20 text-ink hover:border-ink",
  ghost:
    "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-colors duration-200 cursor-pointer ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;