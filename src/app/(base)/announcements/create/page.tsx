"use client";

import { Container } from "@/components/shared/Container";
import { CreateAnnouncementForm } from "./_components/CreateAnnouncementForm";

const CreateAnnouncementPage = () => {

    return (
        <Container className="mt-8">
            <h1 className="text-3xl font-bold text-center">
                Створити оголошення
            </h1>
            <div className="max-w-[500px] w-full mx-auto">
                <CreateAnnouncementForm />
            </div>
        </Container>
    );
};

export default CreateAnnouncementPage;
