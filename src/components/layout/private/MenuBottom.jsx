import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuBottom = () => {
    return (
        <nav className='sm:hidden fixed bottom-0 w-full p-2 bg-blue-500  '>
            <ul className=" flex items-center justify-evenly gap-5 ">
                <li className="">
                    <NavLink to={"/User/Home"} className="">
                        <i className="fa-solid fa-house"></i>
                    </NavLink>
                </li>

                <li className="">
                    <NavLink to={"/User/People"} className="">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                </li>

                <li className="">
                    <NavLink to={"/User/Chats"} className="">
                        <i className="fa-solid fa-envelope"></i>
                    </NavLink>
                </li>

                <li className="">
                    <NavLink to={"/User/MyProfile"} className="">
                        <i className="fa-solid fa-user"></i>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MenuBottom
