
// components
import CabinTable from "../components/cabins/CabinTable";
import AddCabin from "../components/cabins/AddCabin";
import CabinTableOperations from "../components/cabins/CabinTableOperations";


const Cabins = () => {

    return (
        <div className="max-w-screen-xl flex flex-col mx-auto my-10 px-6">
            <header className="flex justify-between items-center">
                <h1 className="font-medium uppercase">Сви апартмани:</h1>
                <CabinTableOperations />
            </header>
            <CabinTable />
            <AddCabin />
        </div>
    )
}

export default Cabins;