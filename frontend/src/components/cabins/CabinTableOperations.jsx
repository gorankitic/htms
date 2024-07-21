
// components
import Filter from "../Filter";
import Sort from "../Sort";


const CabinTableOperations = () => {
    return (
        <div className="flex items-center gap-4">
            <Filter
                filterField="discount"
                options={[
                    { value: "all", label: "Сви" },
                    { value: "no-discount", label: "Без попуста" },
                    { value: "with-discount", label: "Са попустом" }
                ]}
            />
            <Sort
                options={[
                    { value: "name-asc", label: "Сортирај по имену (А-Ш)" },
                    { value: "name-desc", label: "Сортирај по имену (Ш-А)" },
                    { value: "regularPrice-asc", label: "Сортирај по цијени (растуће)" },
                    { value: "regularPrice-desc", label: "Сортирај по цијени (опадајуће)" },
                    { value: "maxCapacity-asc", label: "Сортирај по капацитету (растуће)" },
                    { value: "maxCapacity-desc", label: "Сортирај по капацитету (опадајуће)" },
                ]}
            />
        </div>
    )
}

export default CabinTableOperations;