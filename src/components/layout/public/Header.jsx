import { NavLink } from 'react-router-dom'
import Nav from './Nav'

const Header = () => {
    return (
        <>
            <header className="w-full flex items-center gap-6 p-4 text-white bg-blue-500">
                <div className="">
                    <NavLink to="/" className="sm:text-xl font-bold">EMPRENET</NavLink>
                </div>

                <Nav />
            </header>
        </>
    )
}

export default Header
