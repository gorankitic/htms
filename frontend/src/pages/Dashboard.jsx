// components
import DashboardFilter from "../components/dashboard/DashboardFilter";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const Dashboard = () => {
    return (
        <div className="max-w-screen-xl flex flex-col mx-auto mt-8 px-6">
            <header className="flex justify-between items-center mb-8">
                <h1 className="font-medium uppercase text-xl">Статистика пословања:</h1>
                <DashboardFilter />
            </header>
            <DashboardLayout />
        </div>
    )
}

export default Dashboard;