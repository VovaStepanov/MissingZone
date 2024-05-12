import { announcementsService } from "@/services/announcements.service";
import { useMutation } from "@tanstack/react-query";

export const useVerifyComment = () => {
    return useMutation({
        mutationFn: (id: string) => announcementsService.verifyComment(id),
    });
};
