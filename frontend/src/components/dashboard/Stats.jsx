// components
import StatBox from "./StatBox";
import { HiOutlineCalendarDays, HiOutlineShieldCheck, HiOutlineBanknotes, HiOutlineChartPie } from "react-icons/hi2";
// utils
import { formatCurrency } from "../../utils/utils";

const Stats = ({ bookings, confirmedStays, numCabins, period }) => {

    const sales = confirmedStays.reduce((acc, stay) => acc + stay.totalPrice, 0);
    const checkins = confirmedStays.reduce((acc, stay) => acc + stay.numGuests, 0);
    const occupation = confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) / (period * numCabins);

    return (
        <div className="flex justify-between  gap-10 mb-8">
            <div className="flex justify-between w-1/2">
                <StatBox
                    title="Резервације: "
                    icon={<HiOutlineCalendarDays className="stat-icon stroke-indigo-600" />}
                    value={bookings.length}
                />
                <StatBox
                    title="Стање: "
                    icon={<HiOutlineBanknotes className="stat-icon stroke-teal-600" />}
                    value={formatCurrency(sales)}
                />
            </div>
            <div className="flex justify-between w-1/2">
                <StatBox
                    title="Пријављени гости: "
                    icon={<HiOutlineShieldCheck className="stat-icon stroke-rose-600" />}
                    value={checkins}
                />
                <StatBox
                    title="Попуњеност смjештаја: "
                    icon={<HiOutlineChartPie className="stat-icon stroke-amber-400" />}
                    value={Math.round(occupation * 100) + "%"}

                />
            </div>
        </div>
    )
}

export default Stats;