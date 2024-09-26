// hooks
import { useCabins } from "../../hooks/cabins/useCabins";
import { useLatestBookings } from "../../hooks/bookings/useLatestBookings";
import { useLatestStays } from "../../hooks/bookings/useLatestStays";
// components
import Spinner from "../Spinner";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";

const DashboardLayout = () => {
    const { isLoading: isLoadingBookings, latestBookings } = useLatestBookings();
    const { confirmedStays, isLoading: isLoadingStays, period } = useLatestStays();
    const { data, isLoading: isLoadingCabins } = useCabins();

    if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <Stats bookings={latestBookings} confirmedStays={confirmedStays} period={period} numCabins={data.results} />
            <div className="flex justify-between mb-8 gap-10">
                <TodayActivity />
                <DurationChart confirmedStays={confirmedStays} />
            </div>
            <SalesChart confirmedStays={confirmedStays} period={period} />
        </div>
    )
}

export default DashboardLayout;