import { announcementsService } from "@/services/announcements.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateCommentMutation = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            try {
                return await announcementsService.addFeedbackToAnnouncement(
                    data.id,
                    data.comment,
                );
            } catch (e) {
                throw new Error("Authorization failed");
            }
        },
    });
};
