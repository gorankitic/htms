// react-query
import { useQuery } from "@tanstack/react-query";
// services
import { getSettings } from "../../services/apiSettings";

export const useSettings = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings
    });

    return { isLoading, error, data };
}