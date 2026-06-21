import { cn } from "@/lib/utils";

type BadgeVariant = "vegetarian" | "vegan" | "halal" | "glutenFree" | "spicy";

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  vegetarian: "bg-forest text-white",
  vegan: "bg-green-600 text-white",
  halal: "bg-blue-600 text-white",
  glutenFree: "bg-amber-500 text-white",
  spicy: "bg-red text-white",
};

const labels: Record<BadgeVariant, string> = {
  vegetarian: "V",
  vegan: "VG",
  halal: "H",
  glutenFree: "GF",
  spicy: "🌶",
};

export function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full",
        variantStyles[variant],
        className
      )}
    >
      {labels[variant]}
    </span>
  );
}

interface DietaryBadgesProps {
  dietary: BadgeVariant[];
  className?: string;
}

export function DietaryBadges({ dietary, className }: DietaryBadgesProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {dietary.map((item) => (
        <Badge key={item} variant={item} />
      ))}
    </div>
  );
}
