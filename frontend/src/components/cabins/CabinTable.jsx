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

    // Client-side filtering
    let filteredCabins;
    if (filterValue === "all") filteredCabins = data.cabins;
    if (filterValue === "no-discount") filteredCabins = data.cabins.filter(cabin => cabin.discount === 0);
    if (filterValue === "with-discount") filteredCabins = data.cabins.filter(cabin => cabin.discount > 0);

    // Client-side sorting
    const sortBy = searchParams.get("sortBy") || "name-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins?.sort((a, b) => typeof a[field] === "string" ? a[field].localeCompare(b[field]) * modifier : (a[field] - b[field]) * modifier);

    return (
        <Menu>
            <Table columns="grid-cols-cabins">
                <Table.Header >
                    <div></div>
                    <div>Апартман</div>
                    <div>Капацитет</div>
                    <div>Цијена</div>
                    <div>Попуст</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => <CabinRow key={cabin._id} cabin={cabin} />}
                />
            </Table>
        </Menu>
    )
}

export default CabinTable;