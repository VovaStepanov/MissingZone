import { LoginUser, authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (data: LoginUser) => {
            try {
                return await authService.login(data);
            } catch (e) {
                throw new Error("Authorization failed");
            }
        },
    });
};
