import { createContext, useContext } from "react";


const TableContext = createContext();

const Table = ({ columns, children }) => {

    return (
        <TableContext.Provider value={{ columns }}>
            <div
                role="table"
                className="my-6 border border-gray-200 bg-white overflow-hidden w-full"
            >
                {children}
            </div>
        </TableContext.Provider>
    );
}

const Header = ({ children }) => {
    const { columns } = useContext(TableContext);

    return (
        <div
            role="row"
            as="header"
            className={`grid ${columns} gap-6 items-center text-center bg-gray-200 border border-gray-200 rounded-sm uppercase tracking-wide font-medium py-4 px-10`}
        >
            {children}
        </div >
    )
}

const Row = ({ children }) => {
    const { columns } = useContext(TableContext);

    return (
        <div
            role="row"
            className={`grid ${columns} gap-6 items-center justify-center text-center bg-gray-50 border-b border-b-gray-200 tracking-wide py-2 px-10`}
        >
            {children}
        </div>
    )
}

const Body = ({ data, render }) => {
    if (!data.length) return <div className="py-2 flex justify-center text-sm"><p>Нема података у овом тренутку.</p></div>

    return (
        <div>
            {data.map(render)}
        </div>
    )
}

const Footer = ({ children }) => {
    return (
        <footer>
            {children}
        </footer >
    )
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;