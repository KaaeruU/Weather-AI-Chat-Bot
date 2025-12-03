import { cn } from "@/src/lib/tailwind/utils";
import { IconProps, IconSize } from "./icon.type";
import IconStyle from "@/src/lib/tailwind/icon";
import * as Icons from "@/src/components/atom/Icon/Icons"


export const iconVariantSize: Record<IconSize, string> = {
  67: "size-[4.1rem]",
  51: "size-[3.1rem]",
  32: "size-[2rem]",
  24: "size-[1.5rem]",
  21: "size-[1.3rem]",
  16: "size-[1rem]",
  14: "size-[0.8rem]",
};

export const Icon = ({
  className,
  name,
  size,
  weight,
  variant,
  ...props
}: IconProps) => {
  const IconComp = Icons[name as keyof typeof Icons];

  if (!IconComp) return <></>;

  return (
    <IconComp
      weight={weight}
      {...props}
      className={cn(iconVariantSize[size], IconStyle({ variant }), className)}
    />
  );
};
