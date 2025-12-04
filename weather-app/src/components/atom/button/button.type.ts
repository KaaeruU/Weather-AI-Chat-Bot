import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/src/lib/tailwind/button";

export interface ButtonTypeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  label: string;
  isDisabled: boolean;
}