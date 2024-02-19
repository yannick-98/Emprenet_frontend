import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
    const token = localStorage.getItem('token')
    const navigate = () => {
        window.location.href = '/User'
    }
    if (token) {
        navigate()
    }
    return (
        <>
            <Header />
            <section className='p-4'>
                <Outlet />
            </section>
        </>
    )
}

export default PublicLayout
