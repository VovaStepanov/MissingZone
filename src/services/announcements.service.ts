export interface AnnouncementsFiltersType {
    currentPage: number;
    firstName?: string;
    lastName?: string;
    surname?: string;
    birthDate?: string;
    city?: string;
}

class AnnouncementsService {
    async getAnnouncementById(id: string) {}

    async getAnnouncements(filters: AnnouncementsFiltersType) {
        // TODO: request to get list of announcements with filters
    }
}

export const announcementsService = new AnnouncementsService();
