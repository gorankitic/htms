
// react-query
import { useQuery } from "@tanstack/react-query";
// services
import { getCabins } from "../services/apiCabins";

const CabinTable = () => {
    useQuery({
        queryKey: ["cabin"],
        queryFn: getCabins
    });

    return (
        <div>CabinTable</div>
    )
}

export default CabinTable;