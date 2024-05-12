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

    async createAnnouncement(data: any) {
        try {
            const response = api.post("/MissingPost", data);

            return (await response).data;
        } catch (e) {
            throw new Error("Failed to create announcement");
        }
    }

    async getAllComments() {
        try {
            const response = await api.get("/anonim");

            return response.data;
        } catch (e) {
            throw new Error("Failed fetching comments");
        }
    }

    async verifyComment(id: string) {
        try {
            const response = await api.post(`/${id}`);

            return response.data;
        } catch (e) {
            throw new Error("Failed to verify comment");
        }
    }
}

export const announcementsService = new AnnouncementsService();
