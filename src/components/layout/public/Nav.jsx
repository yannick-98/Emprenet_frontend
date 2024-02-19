import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className="">
            <ul className="flex gap-5" >
                <li>
                    <NavLink to={"/LogIn"} className="space-x-1">
                        <i className="fa-solid fa-user"></i>
                        <span className="menu-list__title">Log in</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/SignUp"} className="space-x-1">
                        <i className="fa-solid fa-feather"></i>
                        <span className="menu-list__title">Sign up</span>
                    </NavLink>
                </li>
            </ul >
        </nav >
    )
}

export default Nav
