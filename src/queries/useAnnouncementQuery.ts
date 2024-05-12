import { announcementsService } from "@/services/announcements.service";
import { useQuery } from "@tanstack/react-query";

export const useAnouncementQuery = (id: string) => {
    return useQuery<any>({
        queryKey: ["anouncement", id],
        queryFn: () => announcementsService.getAnnouncementById(id),
    });
};
