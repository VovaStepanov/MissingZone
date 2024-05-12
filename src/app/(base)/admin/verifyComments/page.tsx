"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useVerifyComment } from "@/mutations/verifyCommentMutation";
import { useAnonimCommentsQuery } from "@/queries/useAnonimComments";
import { QueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

const queryClient = new QueryClient();

const VerifyCommentsPage = () => {
    const { toast } = useToast();
    const { data: comments } = useAnonimCommentsQuery();
    const { mutateAsync: verifyComment } = useVerifyComment();
    console.log(comments);

    return (
        <Container className="pt-4">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Коментар</th>
                        <th className="text-left">Автор</th>
                        <th className="text-left">Підтвердити</th>
                    </tr>
                </thead>
                <tbody>
                    {comments?.map((comment: any, index: number) => (
                        <tr key={index}>
                            <td
                                dangerouslySetInnerHTML={{
                                    __html: comment.comment,
                                }}
                            ></td>
                            <td>
                                {comment.firstName} {comment.lastName}
                            </td>
                            <td className="flex justify-center border-0 h-full items-center ">
                                <Button
                                    onClick={async () => {
                                        try {
                                            await verifyComment(
                                                comment.commnetId,
                                            );
                                            toast({
                                                title: "Успіх",
                                                description:
                                                    "Коментар верифіковано",
                                            });
                                            queryClient.invalidateQueries();
                                        } catch (e) {
                                            toast({
                                                title: "Помилка",
                                                description: "Спробуй пізніше",
                                            });
                                        }
                                    }}
                                >
                                    <Check />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
};

export default VerifyCommentsPage;
