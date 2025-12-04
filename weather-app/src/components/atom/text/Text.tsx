import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/src/lib/tailwind/utils";
import { TextType, TextTypeProps, TextVariant } from "./text.type";

const Text = <T extends TextType>({
  asChild,
  as,
  styledAs,
  className,
  children,
  ...props
}: TextTypeProps<T>) => {
  const Comp = asChild ? Slot : as || "p";

  const textStyles: Record<TextVariant, string> = {
    "body-xs": "body-xs",
    button: "body-md",
    label: "label-regular",
    body: "body-regular",
    title: "md:text-4xl text-2xl font-bold",
  };
  const styleKey = styledAs;

  return (
    <Comp className={cn(textStyles[styleKey], className)} {...props}>
      {children}
    </Comp>
  );
};

Text.displayName = "Text";
export { Text };
