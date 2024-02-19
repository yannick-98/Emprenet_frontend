import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import UseAuth from '../../../hooks/UseAuth'
import { Global } from '../../../helpers/Global'


const Nav = () => {
    // const { auth, counts, loading } = UseAuth()
    const { auth, counts } = UseAuth()
    const avatar = auth.avatar ? (Global.url + "user/avatar/" + auth.avatar) : '/src/assets/img/user.png'

    const [showMenu, setShowMenu] = useState(false)
    const openMenu = () => {
        setShowMenu(!showMenu)
    }
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/'
    }

    const renderMenu = () => {
        return (
            <div className='absolute top-[6vh] right-0 w-52 text-center p-2 space-y-1 bg-white border-2 border-zinc-200 text-black '>
                <img src={avatar} className="h-20 w-20 rounded-full mx-auto" alt="Imagen de perfil" />
                <section className='space-y-2'>
                    <p className='font-semibold'><span className='text-xl font-normal'>{auth.name}</span> <br /> @{auth.nickName} </p>
                    <p className='text-sm'>Posts: {counts.posts} <br />Followers: {counts.followers} <br />Following: {counts.following}</p>
                </section>
                <br />
                <hr />
                <br />
                <section className='text-sm text-start'>
                    <NavLink onClick={openMenu} to={`/User/MyProfile`} className="block p-2 hover:bg-zinc-200">
                        <i className="fa-solid fa-user">My profile</i>
                    </NavLink>
                    <NavLink onClick={openMenu} to={"/User/Settings"} className="block p-2 hover:bg-zinc-200">
                        <i className="fa-solid fa-gear">Settings</i>
                    </NavLink>
                    <button onClick={logout} className="block p-2 hover:bg-zinc-200">
                        <i className="fa-solid fa-sign-out">Logout</i>
                    </button>
                </section>
            </div>
        )
    }

    return (
        <>
            <nav className="flex justify-end sm:justify-between w-full">

                <ul className="hidden sm:flex items-center gap-5 ">
                    <li className="">
                        <NavLink to={"/User/Home"} className="">
                            <i className="fa-solid fa-house"></i>
                        </NavLink>
                    </li>

                    <li className="">
                        <NavLink to={"/User/MyProfile"} className="">
                            <i className="fa-solid fa-user"></i>
                        </NavLink>
                    </li>

                    <li className="">
                        <NavLink to={"/User/Chats"} className="">
                            <i className="fa-solid fa-envelope"></i>
                        </NavLink>
                    </li>

                    <li className="">
                        <NavLink to={"/User/People"} className="">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                    </li>
                </ul>

                <ul className="flex items-center gap-3 ">
                    {!showMenu &&
                        <li className="">
                            <NavLink to={"/User/MyProfile"} className="">
                                <img src={avatar} className="w-10 h-10 rounded-full" alt="Imagen de perfil" />
                            </NavLink>
                        </li>}
                    <li className="">
                        <button onClick={openMenu} className="space-x-1">
                            <span className="text-[0px] sm:text-sm font-bold">{auth.nickName}</span>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </li>
                </ul>
            </nav>
            {showMenu &&
                renderMenu()
            }
        </>
    )
}

export default Nav
