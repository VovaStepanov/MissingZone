import { api } from "@/api/api";
import axios from "axios";

export interface AnnouncementsFiltersType {
    currentPage?: number;
    firstName?: string;
    lastName?: string;
    surname?: string;
    birthDate?: string;
    city?: string;
}

class AnnouncementsService {
    async getAnnouncementById(id: string) {}

    async getAnnouncements(filters: AnnouncementsFiltersType) {
        const data = {
            FirstName: filters.firstName,
            LastName: filters.lastName,
            FatherName: filters.surname,
            BirthDate: filters.birthDate,
            City: filters.city,
            PageNumber: filters.currentPage,
            pageSize: 24,
        };

        try {
            const response = await api.get("/MissingPost", {
                params: data,
            });
            return response.data;
        } catch (e) {
            throw new Error("Failed to get announcements");
        }
    }
}

export const announcementsService = new AnnouncementsService();
