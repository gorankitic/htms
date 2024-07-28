// hooks
import { useSearchParams } from "react-router-dom";
// assets
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
// libs
import { PAGE_SIZE } from "../utils/constants";
import { useEffect } from "react";

const Pagination = ({ count, numPages, numElementsPerPage }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    let currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    useEffect(() => {
        if (numElementsPerPage === 0) {
            previousPage()
        }
    }, [numElementsPerPage]);

    const nextPage = () => {
        const next = currentPage === numPages ? currentPage : currentPage + 1;
        searchParams.set("page", next);
        setSearchParams(searchParams);
    }

    const previousPage = () => {
        const previous = currentPage === 1 ? currentPage : currentPage - 1;
        searchParams.set("page", previous);
        setSearchParams(searchParams);
    }

    if (numPages <= 1) return null;

    return (
        <div className="w-full py-2 px-4 bg-gray-200 flex items-center justify-between text-sm">
            <p>Приказано од
                <span className="font-semibold"> {(currentPage - 1) * PAGE_SIZE + 1}</span> до
                <span className="font-semibold"> {currentPage === numPages ? count : currentPage * PAGE_SIZE}</span> од укупно
                <span className="font-semibold"> {count}</span> резултата
            </p>
            <div className="flex gap-1">
                <button
                    className="pagination-button"
                    onClick={previousPage}
                    disabled={currentPage === 1}
                >
                    <HiChevronLeft />
                    <span className="pr-1">Претходно</span>
                </button>
                <button
                    className="pagination-button"
                    onClick={nextPage}
                    disabled={currentPage === numPages}
                >
                    <span className="pl-1">Сљедеће</span>
                    <HiChevronRight />
                </button>
            </div>
        </div>
    )
}

export default Pagination;