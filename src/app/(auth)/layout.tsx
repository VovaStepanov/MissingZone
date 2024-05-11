import { AuthHeader } from "@/components/shared/AuthHeader";
import { FC } from "react";

interface AuthLayout {
    children: React.ReactNode;
}

const AuthLayout: FC<AuthLayout> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthHeader />
            <main className="flex-1 flex flex-col">{children}</main>
        </div>
    );
};

export default AuthLayout;
