
// components
import { AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
// libs
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { sr } from "date-fns/locale";

const SalesChart = ({ confirmedStays, period }) => {

    const periodDates = eachDayOfInterval({
        start: subDays(new Date(), period - 1),
        end: new Date()
    });

    const data = periodDates.map(date => {
        return {
            label: format(date, "dd.MMM", { locale: sr }),
            totalSales: confirmedStays
                .filter(booking => isSameDay(date, new Date(booking.startDate)))
                .reduce((acc, booking) => acc + booking.totalPrice, 0)
        }
    });

    return (
        <div>
            <p className="font-medium uppercase mb-2">Стање за период {format(periodDates.at(0), "dd.MM.yyyy.")} &mdash;{" "} {format(periodDates.at(-1), "dd.MM.yyyy.")}</p>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ left: 20 }}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="label" />
                    <YAxis unit="KM" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", color: "#4b5563", fontSize: "12px", padding: "2px" }} />
                    <Area
                        type="monotone"
                        dataKey="totalSales"
                        name="Уплаћено"
                        unit="КМ"
                        stroke="#0d9488"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#color)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesChart;