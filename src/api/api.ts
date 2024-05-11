import axios from "axios";

export const api = axios.create({
    baseURL: "https://missingzoneapi20240511172347.azurewebsites.net/",
});
