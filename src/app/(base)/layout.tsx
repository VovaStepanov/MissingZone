import { Header } from "@/components/shared";
import { FC } from "react";

interface ClientLayoutPropsType {
    children: React.ReactNode;
}

const ClientLayout: FC<ClientLayoutPropsType> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex">{children}</main>
        </div>
    );
};

export default ClientLayout;
