
// components
import Filter from "../Filter";


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
        </div>
    )
}

export default CabinTableOperations;