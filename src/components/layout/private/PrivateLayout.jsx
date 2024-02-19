import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import MenuBottom from './MenuBottom'
import UseAuth from '../../../hooks/UseAuth'
import CreatePost from '../../posts/CreatePost'

const PrivateLayout = () => {

    const token = localStorage.getItem('token')
    const navigate = () => {
        window.location.href = '/LogIn'
    }
    if (!token) {
        navigate()
    }
    const { loading } = UseAuth()
    if (loading) {
        return (
            <>
                <Header />
                <section className=' flex flex-col lg:flex-row-reverse gap-3 justify-center p-3 pb-12 sm:pb-3'>
                    <section className='flex flex-col gap-2 w-full max-w-[1000px] lg:max-w-[500px] border-2 rounded-lg bg-white border-zinc-200 p-2'>
                        <CreatePost />
                    </section>
                    <section className='flex flex-col justify-center gap-2 w-full max-w-[1000px] border-2 rounded-lg border-zinc-200 bg-white p-2'>
                        <Outlet />
                    </section>
                </section>
                <MenuBottom />
            </>
        )
    }
}

export default PrivateLayout
