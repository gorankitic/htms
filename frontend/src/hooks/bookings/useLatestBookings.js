// hooks
import { useSearchParams } from "react-router-dom";
// react-query
import { useQuery } from "@tanstack/react-query";
// services
import { getLatestBookings } from "../../services/apiBookings";

export function useLatestBookings() {
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("last");
    const period = !filterValue ? 7 : Number(filterValue);

    const { isLoading, data } = useQuery({
        queryKey: ["bookings", period],
        queryFn: () => getLatestBookings(period)
    });

    return { isLoading, latestBookings: data?.latestBookings }
}