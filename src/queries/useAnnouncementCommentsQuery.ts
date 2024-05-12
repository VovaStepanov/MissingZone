import { announcementsService } from "@/services/announcements.service";
import { useQuery } from "@tanstack/react-query";

export const useAnouncementCommentsQuery = (id: string) => {
    return useQuery<any>({
        queryKey: ["anouncementComments", id],
        queryFn: () => announcementsService.getAnnouncementUsersComments(id),
    });
};
