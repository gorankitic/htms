// hooks
import { useSearchParams } from "react-router-dom";
// react-query
import { useQuery } from "@tanstack/react-query"
// services
import { getBookings } from "../../services/apiBookings";

export const useBookings = () => {
    const [searchParams] = useSearchParams();
    // Filter
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? "" : filterValue;
    // SortBy
    const sortBy = searchParams.get("sortBy") || "startDate-desc";

    const { isLoading, data, error } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings(filter, sortBy)
    });

    return { isLoading, data, error };
}