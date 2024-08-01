// react-query
import { useMutation } from "@tanstack/react-query";
// services
import { login as loginApi } from "../../services/apiAuth";

export const useLogin = () => {
    const { mutate: login, isPending: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
    });

    return { login, isLoggingIn }
}