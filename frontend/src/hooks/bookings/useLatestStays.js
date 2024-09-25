// hooks
import { useSearchParams } from "react-router-dom";
// react-query
import { useQuery } from "@tanstack/react-query";
// services
import { getLatestStays } from "../../services/apiBookings";

export function useLatestStays() {
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("last");
    const period = !filterValue ? 7 : Number(filterValue);

    const { isLoading, data } = useQuery({
        queryKey: ["stays", period],
        queryFn: () => getLatestStays(period)
    });

    const confirmedStays = data?.latestStays.filter(stay => stay.status === "пријављен" || stay.status === "одјављен");

    return { isLoading, latestStays: data?.latestStays, confirmedStays, period };
}