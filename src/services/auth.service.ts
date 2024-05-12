import { api } from "@/api/api";

export interface LoginUser {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    role: string;
}

export interface RegisterUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    photo: string;
    phone: string;
    organizationName: string;
}

export interface RegistratioResponse {
    token: string;
    role: string;
}

class AuthService {
    async login(data: LoginUser) {
        const response = await api.post<RegistratioResponse>(
            "/Auth/login",
            data,
        );

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error("Failed to login");
    }
    async register(data: RegisterUser) {
        const response = await api.post<RegistratioResponse>(
            "/Auth/registration",
            data,
        );

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error("Failed to register");
    }
    async logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        window.location.replace("/login");
    }
}

export const authService = new AuthService();
