// hooks
import { useCabins } from "../../hooks/cabins/useCabins";
// components
import CabinRow from "./CabinRow";
import Spinner from "../Spinner";
import Table from "../Table";

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
        <>
            <Table columns="grid-cols-6">
                <Table.Header >
                    <div></div>
                    <div>Апартман</div>
                    <div>Капацитет</div>
                    <div>Цијена</div>
                    <div>Попуст</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={data.cabins}
                    render={(cabin) => <CabinRow key={cabin._id} cabin={cabin} />}
                />
            </Table>
        </>
    )
}

export default CabinTable;