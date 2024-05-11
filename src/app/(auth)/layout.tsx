import { AuthHeader } from "@/components/shared/AuthHeader";
import { ComponentPropsWithoutRef, FC } from "react";

interface AuthLayout extends ComponentPropsWithoutRef<"div"> {}

const AuthLayout: FC<AuthLayout> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthHeader />
            <main className="flex-1 flex flex-col">{children}</main>
        </div>
    );
};

export default AuthLayout;
