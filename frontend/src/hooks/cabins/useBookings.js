
// react-query
import { useQuery } from "@tanstack/react-query"
// services
import { getBookings } from "../../services/apiBookings";


export const useBookings = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ["bookings"],
        queryFn: getBookings
    });

    return { isLoading, data, error };
}