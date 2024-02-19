import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import UseAuth from '../../hooks/UseAuth'


const Chat = () => {
    const { auth } = UseAuth()
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const chatId = window.location.pathname.split('/')[3]
    const otherUser = chat.user1 === auth.id ? chat.user2data : chat.user1data

    useEffect(() => {
        getChat()
    }, [chat, token, message, chatId, otherUser])

    const getChat = async () => {
        try {
            const response = await fetch(`${Global.url}chat/GetChat/${chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            if (response.status == 200) {
                const res = await response.json()
                setChat(res.chat)
                setLoading(false)
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessage = async () => {
        try {
            const response = await fetch(`${Global.url}chat/NewMessage/${chatId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    text: message,
                    user: auth.id,
                    username: auth.name
                })
            })
            if (response.status == 200) {
                const res = await response.json()
                setChat(res.chat)
                setLoading(false)
                const input = document.querySelector('input')
                input.value = ''
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className='w-full flex flex-col pt-2 space-y-10'>
            <p className='text-xl font-bold'>{chat._id && otherUser.name}</p>
            <div className='w-full h-full bg-white rounded-md flex flex-col items-center justify-center gap-1'>
                {loading ? <p>Loading...</p> : chat.messages.map((message, index) => {
                    const user = message.user === auth.id ? auth : otherUser
                    const avatar = user.avatar ? (Global.url + "user/avatar/" + user.avatar) : '/src/assets/img/user.png'
                    return (
                        <>
                            <div key={index} className={` w-full flex gap-2 ${message.user === auth.id ? 'text-start' : 'text-end flex-row-reverse'}`}>
                                <img src={avatar} alt="" className='w-8 h-8 rounded-full' />
                                <p>{message.text}</p>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className='w-full flex justify-center gap-2'>
                <input onChange={handleInputChange} type='text' placeholder='Write a message' className='w-4/5 h-6  p-2 border-2 border-gray-400 rounded-md outline-none' />
                <button onClick={sendMessage} className='w-1/5 h-6  text-white bg-blue-500 hover:bg-blue-400 rounded-md'>Send</button>
            </div>
        </div>
    )
}

export default Chat
