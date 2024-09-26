
const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="text-center">
            <h1 className="font-semibold text-2xl mt-20 mb-4">Something went wrong!</h1>
            <p className="mb-4">{error.message}</p>
            <button className="btn-primary" onClick={resetErrorBoundary}>
                Тry again!
            </button>
        </div>
    )
}

export default ErrorFallback;