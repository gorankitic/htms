// components
import Filter from "../Filter";

const DashboardFilter = () => {
    return (
        <Filter
            filterField="last"
            options={[
                { value: "7", label: "Задњих 7 дана" },
                { value: "30", label: "Задњих 30 дана" },
                { value: "90", label: "Задњих 90 дана" },
            ]}
        />
    )
}

export default DashboardFilter;