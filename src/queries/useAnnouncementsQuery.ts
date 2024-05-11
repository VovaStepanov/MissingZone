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
    id: number;
    title: string;
    image: string;
}

export const useAnouncementsQuery = (filters: AnnouncementsFiltersType) => {
    return useInfiniteQuery<any>({
        queryKey: ["items", filters],
        queryFn: async ({ pageParam }) => {
            return announcementsService.getAnnouncements({
                ...filters,
                currentPage: pageParam as number,
            });
        },
        getNextPageParam: (lastPage) => {
            const hasMore =
                lastPage.totalCount - lastPage.pageSize * lastPage.pageNumber >
                0;

            return hasMore ? lastPage.pageNumber + 1 : undefined;
        },
        initialPageParam: 1,
    });
};
