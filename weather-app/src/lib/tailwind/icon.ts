import { cva } from "class-variance-authority";

export const IconStyle = cva(["transition duration-500"], {
  variants: {
    variant: {
      default: "ease-in",
      danger: "ease-in-out hover:text-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default IconStyle;