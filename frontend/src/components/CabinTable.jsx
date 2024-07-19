// hooks
import { useCabins } from "../hooks/useCabins";
// components
import CabinRow from "./CabinRow";
import Spinner from "./Spinner";

const CabinTable = () => {
    const { isLoading, data } = useCabins();

    if (isLoading) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    return (
        <table className="my-6 border border-gray-200 bg-white overflow-hidden w-full">
            <tbody>
                <tr className="grid grid-cols-6 gap-6 items-center bg-gray-200 border border-gray-200 rounded-sm uppercase tracking-wide font-medium py-4 px-4">
                    <th></th>
                    <th>Апартман</th>
                    <th>Капацитет</th>
                    <th>Цијена</th>
                    <th>Попуст</th>
                    <th></th>
                </tr>
                {data.cabins.length === 0 && <tr className="py-2 flex justify-center text-sm"><th>Нема апартмана</th></tr>}
                {data.cabins.map((cabin) => (
                    <CabinRow key={cabin._id} cabin={cabin} />
                ))}
            </tbody>
        </table>
    )
}

export default CabinTable;