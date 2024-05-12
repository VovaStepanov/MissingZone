import { announcementsService } from "@/services/announcements.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateAnnouncementMutation = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            try {
                return await announcementsService.createAnnouncement(data);
            } catch (e) {
                throw new Error("Authorization failed");
            }
        },
    });
};
