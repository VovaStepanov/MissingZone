import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react";

interface ContainerPropsType extends ComponentPropsWithoutRef<"div"> {}

export const Container: FC<ContainerPropsType> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <div
            className={cn("w-full max-w-[1500px] mx-auto px-4", className)}
            {...rest}
        >
            {children}
        </div>
    );
};
