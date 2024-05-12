import {
    AnnouncementsFiltersType,
    announcementsService,
} from "@/services/announcements.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface FetchDataResponse {
    items: Item[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}

export interface Item {
    missingPostId: number;
    title: string;
    photos: string[] | null;
}

export const useAnouncementsQuery = (filters: AnnouncementsFiltersType) => {
    return useInfiniteQuery<any>({
        queryKey: ["items", filters],
        queryFn: async ({ pageParam }) => {
            console.log(pageParam, "asd");
            return announcementsService.getAnnouncements({
                ...filters,
                currentPage: pageParam as number,
            });
        },
        getNextPageParam: (lastPage) => {
            const hasMore = lastPage.pageNumber !== lastPage.totalPages;

            return hasMore ? lastPage.pageNumber + 1 : undefined;
        },
        initialPageParam: 1,
    });
};
