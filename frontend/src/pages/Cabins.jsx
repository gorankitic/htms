
// components
import CabinTable from "../ui/CabinTable";

const Cabins = () => {


    return (
        <>
            <header className="flex justify-between">
                <h1>Сви апартмани</h1>
                <p>Филтер / Сортирај</p>
            </header>
            <CabinTable />
        </>
    )
}

export default Cabins