import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex flex-wrap items-center justify-center min-h-12 rounded-full px-6 py-3 font-medium transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default:
            "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        formSubmit:
            "bg-blue-500 text-white hover:bg-gray-200 hover:shadow-md col-span-2 md:col-span-6 lg:col-span-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);