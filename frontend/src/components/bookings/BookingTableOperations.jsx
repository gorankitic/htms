// components
import Filter from "../Filter";
import Sort from "../Sort";

const BookingTableOperations = () => {
    return (
        <div className="flex items-center gap-4">
            <Filter
                filterField="status"
                options={[
                    { value: "all", label: "Сви" },
                    { value: "пријављен", label: "Пријављени" },
                    { value: "одјављен", label: "Одјављени" },
                    { value: "непотврђен", label: "Непотврђени" },
                ]}
            />

            <Sort
                options={[
                    { value: "startDate-desc", label: "Сортирај по датуму (нови)" },
                    { value: "startDate-asc", label: "Сортирај по датуму (старији)" },
                    { value: "totalPrice-desc", label: "Сортирај по цијени (опадајуће)" },
                    { value: "totalPrice-asc", label: "Сортирај по цијени (растуће)" },
                ]}
            />
        </div>
    )
}

export default BookingTableOperations;