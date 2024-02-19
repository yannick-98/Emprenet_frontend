import React from 'react'
import Nav from './Nav'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className='flex items-center h-[6vh] text-white bg-blue-500 '>
                <header className="flex w-full max-w-[1540px] mx-auto items-center justify-between gap-8 p-4">
                    <NavLink to="/User" className="sm:text-xl font-bold ">EMPRENET</NavLink>
                    <Nav />
                </header>
            </div>
        </>
    )
}

export default Header
