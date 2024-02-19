import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global'
import UseAuth from '../../hooks/UseAuth'
import { NavLink } from 'react-router-dom'

const Chats = () => {
    const { auth } = UseAuth()
    const [chats, setChats] = useState([])
    const [filteredChats, setFilteredChats] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token')

    useEffect(() => {
        searchChats()
    }, [searchQuery])

    useEffect(() => {
        chatsList()
    }, [chats])

    useEffect(() => {
        getChats()
    }, [chats, token])

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const getChats = async () => {
        try {
            const response = await fetch(`${Global.url}chat/GetChats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            if (response.status == 200) {
                const res = await response.json()
                setChats(res.chats)
                setLoading(false)
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const searchChats = () => {
        if (searchQuery.length > 0) {
            let filtered = chats.filter(chat => {
                const lowerCaseUser1 = chat.user1data.name.toLowerCase();
                const lowerCaseUser2 = chat.user2data.name.toLowerCase();
                const lowerCaseSearchQuery = searchQuery.toLowerCase();
                return (
                    lowerCaseUser1.includes(lowerCaseSearchQuery) ||
                    lowerCaseUser2.includes(lowerCaseSearchQuery)
                );
            });
            console.log(filtered)
            if (filtered.length == 0) {
                setFilteredChats([])
            } else {
                setFilteredChats(filtered)
            }
        }
    }

    const chatsList = () => {
        if (!chats) {
            return (
                <div className='flex items-center justify-center text-center w-full'>
                    <p className='text-gray-400'>Not chats found </p>
                </div>
            )
        }
        const filtered = searchQuery.length > 0 ? filteredChats : chats
        const list = filtered.map((chat, index) => {
            const user1 = chat.user1
            const user = user1 !== auth.id ? chat.user1data : chat.user2data
            const avatar = user.avatar ? (Global.url + "user/avatar/" + user.avatar) : '/src/assets/img/user.png'
            const chatLink = `/User/Chat/${chat._id}`
            return (
                <div key={index} className='w-full flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <img src={avatar} alt="avatar" className='w-12 h-12 rounded-full p-1 hover:scale-105' />
                        <p className='font-semibold'>{user.name}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <NavLink to={chatLink} className='border rounded-lg bg-blue-400 px-1 '>Open</NavLink>
                        <button onClick={() => deleteChat(chat._id)} className='border rounded-lg bg-red-400 px-1'>Delete</button>
                    </div>
                </div>
            )
        })
        return list
    }

    const deleteChat = async (chatId) => {
        try {
            const response = await fetch(`${Global.url}chat/deleteChat/${chatId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            if (response.status == 200) {
                const res = await response.json()
                console.log(res)
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <section className=' border rounded p-1'>
                <input
                    type="text"
                    placeholder="Ingrese su búsqueda"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className='w-full text-center'
                />
            </section>
            <section className='space-y-1'>
                {chatsList()}
            </section>
        </div>
    )
}


export default Chats
