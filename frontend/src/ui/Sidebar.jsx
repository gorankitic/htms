
// components
import { NavLink } from "react-router-dom";
// assets
import Logo from "../assets/logo.png";
import { HiOutlineHome, HiOutlineCalendarDays, HiOutlineHomeModern, HiOutlineUsers, HiOutlineCog8Tooth } from "react-icons/hi2";

const Sidebar = () => {
    return (
        <aside className='py-4 border-r-2 border-gray-200 min-w-60'>
            <div className="flex flex-col items-center">
                <img src={Logo} className="w-[90px] h-[90px] mb-1" />
                <p className="text-xl font-medium uppercase tracking-wider">Хотел Тајан</p>
            </div>
            <nav className="my-6 mx-4">
                <ul className="space-y-1 py-2 tracking-wider font-medium text-sm">
                    <li className="w-full">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineHome className="navlink-icon" />
                            <span>Почетна</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to="/bookings"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineCalendarDays className="navlink-icon" />
                            <span>Резервације</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to="/cabins"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineHomeModern className="navlink-icon" />
                            <span>Апартмани</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to="/users"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineUsers className="navlink-icon" />
                            <span>Корисници</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineCog8Tooth className="navlink-icon" />
                            <span>Подешавања</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar