

const DataItem = ({ icon, label, children }) => {
    return (
        <div className="flex items-center gap-2 py-1">
            <span className="flex items-center gap-2 font-medium">
                {icon}
                <span>{label}</span>
            </span>
            {children}
        </div>
    )
}

export default DataItem;