"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCreateCommentMutation } from "@/mutations/createCommentMutation";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
});

interface FeadBackAnnoncementsPagePropsType {
    params: {
        id: string;
    };
}

const CreateFeedBackPage: FC<FeadBackAnnoncementsPagePropsType> = ({
    params: { id },
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [comment, setComment] = useState<string>("");

    const { mutateAsync: createComment } = useCreateCommentMutation();

    const onSubmit = async () => {
        if (!comment) {
            toast({
                title: "Помилка",
                description: "Коментар не може бути порожнім",
            });
            return;
        }
        try {
            await createComment({
                id,
                comment,
            });
            toast({
                title: "Успіх",
                description: "Коментар успішно створено",
            });
            router.replace(`/announcements/${id}`);
        } catch (e) {
            toast({
                title: "Помилка",
                description: "Спробуйте пізніше",
            });
        }
    };

    return (
        <Container className="pt-4">
            <p className="font-bold text-3xl">Залишити відгук на оголошення</p>
            <div className="mt-4">
                <ReactQuill
                    className="h-[300px]"
                    theme="snow"
                    value={comment}
                    onChange={setComment}
                />
            </div>
            <div className="flex justify-end">
                <Button className="mt-[50px]" onClick={onSubmit}>
                    Відправити
                </Button>
            </div>
        </Container>
    );
};

export default CreateFeedBackPage;
