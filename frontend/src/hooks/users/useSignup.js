// react-query
import { useMutation } from "@tanstack/react-query";
// services
import { signup as signupApi } from "../../services/apiAuth";

export const useSignup = () => {
    const { mutate: signup, isPending } = useMutation({
        mutationFn: ({ name, email, password }) => signupApi({ name, email, password }),
    });

    return { signup, isPending }
}