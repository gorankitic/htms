// hooks
import { useParams } from "react-router-dom";
// react-query
import { useQuery } from "@tanstack/react-query"
// services
import { getBooking } from "../../services/apiBookings";

export const useBooking = () => {
    const { bookingId } = useParams();

    const { isLoading, data, error } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId)
    });

    return { isLoading, data, error };
}