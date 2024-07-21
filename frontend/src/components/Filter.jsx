
// hooks
import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Filter = ({ filterField, options }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterField) || options.at(0).value;

    const handleClick = (value) => {
        searchParams.set("discount", value);
        setSearchParams(searchParams);
    }

    return (
        <div className="border border-gray-200 bg-gray-50 shadow-sm rounded-md flex gap-1">
            {options.map(option =>
                <button
                    key={option.value}
                    onClick={() => handleClick(option.value)}
                    className={twMerge("filter-button", (option.value === currentFilter) ? "bg-teal-600 text-teal-50" : "bg-gray-50")}
                >
                    {option.label}
                </button>
            )}
        </div>
    )
}
// active:bg-teal-600 active:text-teal-100

export default Filter;