
// hooks
import { useState } from "react";
// components
import CabinTable from "../components/cabins/CabinTable";
import CreateEditCabinForm from "../components/cabins/CreateEditCabinForm";
// assets
import { HiOutlinePlus } from "react-icons/hi2";

const Cabins = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="max-w-screen-xl flex flex-col mx-auto mt-6 px-6">
            <header className="flex justify-between">
                <h1 className="font-semibold text-2xl">Сви апартмани:</h1>
                <p>Филтер / Сортирај</p>
            </header>
            <CabinTable />

            <button
                onClick={() => setShowForm((show) => !show)}
                className="btn-primary ml-auto flex items-center gap-1"
            >
                <HiOutlinePlus className="stroke-2" />
                <span>Додај апартман</span>
            </button>
            {showForm && <CreateEditCabinForm />}
        </div>
    )
}

export default Cabins