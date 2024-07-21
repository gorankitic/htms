
// hooks
import { useSearchParams } from "react-router-dom";
// components
import Select from "./Select";

const Sort = ({ options }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortByValue = searchParams.get("sortBy") || "";

    const handleChange = (e) => {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <Select options={options} onChange={handleChange} value={currentSortByValue} />
    )
}

export default Sort;