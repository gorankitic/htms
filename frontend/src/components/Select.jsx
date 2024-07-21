

const Select = ({ options, value, onChange }) => {
    return (
        <select
            className="py-1 px-2 border rounded-md bg-gray-50 text-sm font-medium uppercase shadow-sm"
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option
                    value={option.value}
                    key={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Select;