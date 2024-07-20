
// components
import CabinTable from "../components/cabins/CabinTable";
import AddCabin from "../components/cabins/AddCabin";


const Cabins = () => {

    return (
        <div className="max-w-screen-xl flex flex-col mx-auto mt-6 px-6">
            <header className="flex justify-between">
                <h1 className="font-semibold text-2xl">Сви апартмани:</h1>
                <p>Филтер / Сортирај</p>
            </header>
            <CabinTable />
            <AddCabin />
        </div>
    )
}

export default Cabins;