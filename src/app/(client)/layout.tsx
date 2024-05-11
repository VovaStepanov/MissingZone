import { Header } from "@/components/shared";
import { ComponentPropsWithoutRef, FC } from "react";

interface ClientLayoutPropsType extends ComponentPropsWithoutRef<"div"> {}

const ClientLayout: FC<ClientLayoutPropsType> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex">{children}</main>
        </div>
    );
};

export default ClientLayout;
