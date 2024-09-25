

const StatBox = ({ icon, title, value }) => {
    return (
        <div className="bg-gray-50 border-gray-100 rounded-md px-2 py-4 flex gap-2 items-center justify-center">
            <div>
                {icon}
            </div>
            <p>{title}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}

export default StatBox;