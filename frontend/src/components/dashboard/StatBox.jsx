
const StatBox = ({ icon, title, value }) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-md py-2 px-4 w-[290px] flex gap-2 items-center justify-center">
            <>{icon}</>
            <p>{title}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}

export default StatBox;