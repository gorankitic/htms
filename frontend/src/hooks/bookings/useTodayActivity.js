// hooks
import { useQuery } from "@tanstack/react-query";
// services
import { getTodayActivity } from "../../services/apiBookings";

export const useTodayActivity = () => {
    const { isLoading, data: activities } = useQuery({
        queryKey: ["today-activity"],
        queryFn: getTodayActivity
    });

    return { isLoading, activities };
}