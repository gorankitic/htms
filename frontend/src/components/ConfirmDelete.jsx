
const ConfirmDelete = ({ resourceName, onConfirm, disabled, onCloseModal }) => {
    return (
        <div className="w-[450px] flex flex-col gap-8">
            <h1 className="text-xl font-medium text-teal-600 text-center">Обриши {resourceName}?</h1>
            <p className="text-center">{`Да ли заиста желите да обришете ${resourceName}?`}</p>
            <div className="flex gap-4 justify-end">
                <button
                    className="btn-secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Одустани
                </button>
                <button
                    className="btn-primary"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    Обриши
                </button>
            </div>
        </div>
    );
}

export default ConfirmDelete;