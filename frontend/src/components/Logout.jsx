// hooks
import { useLogout } from '../hooks/users/useLogout';
// assets
import { LogOut } from 'lucide-react';

const Logout = () => {
    const { logout, isLoading } = useLogout();

    return (
        <button
            onClick={logout}
            disabled={isLoading}
            className='p-2 rounded-md hover:bg-gray-100'
        >
            <LogOut className="h-6 w-6" />
        </button>
    )
}

export default Logout;