// hooks
import { useSearchParams } from "react-router-dom";
import { useCabins } from "../../hooks/cabins/useCabins";
// components
import CabinRow from "./CabinRow";
import Spinner from "../Spinner";
import Table from "../Table";
import Menu from "../Menu";

const CabinTable = () => {
    const { isLoading, data } = useCabins();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("discount") || "all";

    if (isLoading) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    let filteredCabins;
    if (filterValue === "all") filteredCabins = data.cabins;
    if (filterValue === "no-discount") filteredCabins = data.cabins.filter(cabin => cabin.discount === 0);
    if (filterValue === "with-discount") filteredCabins = data.cabins.filter(cabin => cabin.discount > 0);

    return (
        <Menu>
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
                    data={filteredCabins}
                    render={(cabin) => <CabinRow key={cabin._id} cabin={cabin} />}
                />
            </Table>
        </Menu>
    )
}

export default CabinTable;