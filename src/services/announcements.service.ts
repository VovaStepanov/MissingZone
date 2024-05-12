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
    async getAnnouncementById(id: string) {
        try {
            const response = await api.get(`/MissingPost/${id}`);
            return response.data;
        } catch (e) {
            throw new Error("Failed to get announcement with this id");
        }
    }

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

    async addFeedbackToAnnouncement(id: string, comment: string) {
        try {
            const response = await api.post("/Comment", {
                missingPostId: id,
                userId: JSON.parse(localStorage.getItem("email") ?? ""),
                comment,
            });

            return response.data;
        } catch (e) {
            throw new Error("Failed adding comment");
        }
    }

    async getAnnouncementUsersComments(id: string) {
        try {
            const response = await api.get(`/${id}`);

            return response.data;
        } catch (e) {
            throw new Error("Failed receiving comments");
        }
    }
}

export const announcementsService = new AnnouncementsService();
