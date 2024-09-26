// components
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const chartOptions = [
    {
        duration: "1 ноћење",
        value: 0,
        color: "#ef4444",
    },
    {
        duration: "2 ноћења",
        value: 0,
        color: "#f97316",
    },
    {
        duration: "3 ноћења",
        value: 0,
        color: "#eab308",
    },
    {
        duration: "4-5 ноћења",
        value: 0,
        color: "#84cc16",
    },
    {
        duration: "6-7 ноћења",
        value: 0,
        color: "#22c55e",
    },
    {
        duration: "8+ ноћења",
        value: 0,
        color: "#14b8a6",
    },
];

const prepareData = (chartOptions, stays) => {

    const incArrayValue = (arr, field) => arr.map(obj => obj.duration === field ? { ...obj, value: obj.value + 1 } : obj);

    const data = stays
        .reduce((arr, cur) => {
            const num = cur.numNights;
            if (num === 1) return incArrayValue(arr, "1 ноћење");
            if (num === 2) return incArrayValue(arr, "2 ноћења");
            if (num === 3) return incArrayValue(arr, "3 ноћења");
            if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 ноћења");
            if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 ноћења");
            if (num >= 8) return incArrayValue(arr, "8+ ноћења");
            return arr;
        }, chartOptions)
        .filter(obj => obj.value > 0);

    return data;
}

const DurationChart = ({ confirmedStays }) => {

    const data = prepareData(chartOptions, confirmedStays);

    return (
        <div className="w-1/2 bg-gray-50 border border-gray-200 py-4">
            <p className="font-medium uppercase text-center">Дужина боравка по ноћима</p>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        nameKey="duration"
                        dataKey="value"
                        innerRadius={85}
                        outerRadius={110}
                        cx="50%"
                        cy="50%"
                        paddingAngle={3}
                    >
                        {data.map((entry) => (
                            <Cell
                                fill={entry.color}
                                stroke={entry.color}
                                key={entry.duration}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        verticalAlign="middle"
                        align="right"
                        width="30%"
                        layout="vertical"
                        iconSize={15}
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DurationChart;