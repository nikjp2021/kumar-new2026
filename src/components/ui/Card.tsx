import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?: boolean;
  asClickable?: boolean;
}

export function Card({
  children,
  className,
  hover = false,
  asClickable = false,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      role={asClickable ? "button" : undefined}
      tabIndex={asClickable ? 0 : undefined}
      className={cn(
        "rounded-none bg-white border border-black/5 overflow-hidden",
        hover
          ? "shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
          : "shadow-[0_2px_10px_rgba(0,0,0,0.05)]",
        asClickable && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("p-6 border-b border-cream-dark", className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("p-6", className)}>{children}</div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "p-6 border-t border-cream-dark bg-cream/50",
        className
      )}
    >
      {children}
    </div>
  );
}
