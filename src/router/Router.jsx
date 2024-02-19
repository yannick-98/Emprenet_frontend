import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import PublicLayout from '../components/layout/public/PublicLayout'
import PrivateLayout from '../components/layout/private/PrivateLayout'
import LogIn from '../components/users/LogIn'
import SignUp from '../components/users/SignUp'
import Home from '../components/pages/Home'
import People from '../components/pages/People'
import Chats from '../components/pages/Chats'
import Chat from '../components/pages/Chat'
import MyProfile from '../components/pages/MyProfile'
import Profile from '../components/pages/Profile'
import Settings from '../components/pages/Settings'

const Router = () => {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<PublicLayout />}>
                        <Route index element={<LogIn />} />
                        <Route path='LogIn' element={<LogIn />} />
                        <Route path='SignUp' element={<SignUp />} />
                    </Route>
                    <Route path='/User' element={<PrivateLayout />}>
                        <Route index element={<Home />} />
                        <Route path='Home' element={<Home />} />
                        <Route path='People' element={<People />}></Route>
                        <Route path='Chats' element={<Chats />} />
                        <Route path='Chat/:id' element={<Chat />} />
                        <Route path='MyProfile' element={<MyProfile />} />
                        <Route path='Profile/:userId' element={<Profile />} />
                        <Route path='Settings' element={<Settings />} />
                    </Route>
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Router
