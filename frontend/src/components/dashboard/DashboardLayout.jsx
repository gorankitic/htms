// hooks
import { useLatestBookings } from "../../hooks/bookings/useLatestBookings";
import { useLatestStays } from "../../hooks/bookings/useLatestStays";
import { useCabins } from "../../hooks/cabins/useCabins";
// components
import Spinner from "../Spinner";
import Stats from "./Stats";

const DashboardLayout = () => {
    const { isLoading: isLoadingBookings, latestBookings } = useLatestBookings();
    const { latestStays, confirmedStays, isLoading: isLoadingStays, period } = useLatestStays();
    const { data, isLoading: isLoadingCabins } = useCabins();

    if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-2">
            <Stats bookings={latestBookings} confirmedStays={confirmedStays} period={period} numCabins={data.results} />
            <div>Статистика</div>
            <div>Данашња активност</div>
            <div>Дужина боравка</div>
            <div>Продаја</div>
        </div>
    )
}

export default DashboardLayout;