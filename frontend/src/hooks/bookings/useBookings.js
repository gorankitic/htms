// hooks
import { useSearchParams } from "react-router-dom";
// react-query
import { useQuery } from "@tanstack/react-query"
// services
import { getBookings } from "../../services/apiBookings";
// libs
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
    const [searchParams] = useSearchParams();
    // Filter
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? "" : filterValue;
    // SortBy
    const sortBy = searchParams.get("sortBy") || "startDate-desc";
    // Pagination
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    // Limit
    const limit = PAGE_SIZE;

    const { isLoading, data, error } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings(filter, sortBy, page, limit)
    });

    return { isLoading, data, error };
}