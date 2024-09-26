
const StatBox = ({ icon, title, value }) => {
    return (
        <div className="bg-gray-50 border-gray-100 rounded-md p-3 flex gap-2 items-center justify-center">
            <>{icon}</>
            <p>{title}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}

export default StatBox;