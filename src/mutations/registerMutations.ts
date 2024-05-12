import { RegisterUser, authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: async (data: RegisterUser) => {
            try {
                return authService.register(data);
            } catch (e) {
                throw new Error("Register failed");
            }
        },
    });
};
