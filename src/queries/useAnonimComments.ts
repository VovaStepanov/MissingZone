import { announcementsService } from "@/services/announcements.service";
import { useQuery } from "@tanstack/react-query";

export const useAnonimCommentsQuery = () => {
    return useQuery<any>({
        queryKey: ["anonimComments"],
        queryFn: () => announcementsService.getAllComments(),
    });
};
