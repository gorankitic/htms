// hooks
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../context/AuthContext";
// services
import { logout as logoutApi } from "../../services/apiAuth";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: (user) => {
            localStorage.removeItem('user');
            dispatch({ type: 'logout' });
        }
    });

    return { logout, isLoading };
}