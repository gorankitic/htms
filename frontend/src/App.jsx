
// components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { Toaster } from "react-hot-toast";
// context
import { useAuthContext } from "./context/AuthContext.jsx";
// pages
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Cabins from "./pages/Cabins";
import Checkin from "./pages/Checkin";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";

const App = () => {
    const { user } = useAuthContext();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="bookings" element={user ? <Bookings /> : <Navigate to="/login" />} />
                        <Route path="bookings/:bookingId" element={user ? <Booking /> : <Navigate to="/login" />} />
                        <Route path="cabins" element={user ? <Cabins /> : <Navigate to="/login" />} />
                        <Route path="checkin/:bookingId" element={user ? <Checkin /> : <Navigate to="/login" />} />
                        <Route path="users" element={user ? <Users /> : <Navigate to="/login" />} />
                        <Route path="settings" element={user ? <Settings /> : <Navigate to="/login" />} />
                        <Route path="account" element={user ? < Account /> : <Navigate to="/login" />} />
                    </Route>
                    <Route path="login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" />
        </>
    )
}

export default App;