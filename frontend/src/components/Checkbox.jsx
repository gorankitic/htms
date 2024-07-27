
const Checkbox = ({ checked, onChange, disabled = false, id, children }) => {
    return (
        <div className="flex items-center gap-3">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="accent-teal-600 outline-offset-2 disabled:accent-teal-600"
            />
            <label
                htmlFor={!disabled ? id : ""}
                className="flex flex-1 mt-0"
            >
                {children}
            </label>
        </div>
    )
}

export default Checkbox;