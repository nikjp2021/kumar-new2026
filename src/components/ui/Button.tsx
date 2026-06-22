import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "text-charcoal font-semibold border-none cursor-pointer",
  secondary:
    "bg-transparent border-2 border-saffron text-saffron cursor-pointer hover:bg-saffron hover:text-white",
  ghost:
    "bg-transparent border-none text-charcoal cursor-pointer hover:bg-cream-dark",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-3.5 text-base",
  lg: "px-10 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={cn(
        "inline-flex items-center justify-center rounded-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        isPrimary && "shadow-[0_4px_15px_rgba(212,132,26,0.3)] hover:shadow-[0_6px_20px_rgba(212,132,26,0.4)]",
        isPrimary &&
          "bg-gradient-to-br from-saffron to-gold",
        !isPrimary && variant === "ghost" && "hover:shadow-none",
        variant === "secondary" &&
          "hover:shadow-[0_4px_15px_rgba(212,132,26,0.3)]",
        "font-[family-name:var(--font-dm-sans)] tracking-[0.05em]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
