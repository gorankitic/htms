// components
import Logout from './Logout'

const Header = () => {
    return (
        <header className='flex justify-between py-4 px-4 border-b-2 border-gray-200'>
            <p>Header</p>
            <Logout />
        </header>
    )
}

export default Header