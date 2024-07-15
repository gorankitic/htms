// components
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = () => {
    return (
        <div className="flex min-h-screen min-w-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                <Header />
                <main className="bg-slate-100 py-4 px-4 h-full">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AppLayout