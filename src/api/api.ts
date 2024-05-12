import axios from "axios";

export const api = axios.create({
    baseURL: "https://missingzoneapi20240511172347.azurewebsites.net/",
});

api.interceptors.request.use(
    (config) => {
        // Check if the request endpoint is not "/login"
        if (
            config.url &&
            !config.url.includes("/login") &&
            !config.url.includes("/registration")
        ) {
            // Add Authorization header
            config.headers["Authorization"] = JSON.parse(
                localStorage.getItem("accessToken") ?? "",
            );
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Check if the error response status is 401
        if (error.response && error.response.status === 401) {
            // Redirect to /login
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);
