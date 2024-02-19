import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import UseAuth from '../../hooks/UseAuth'
import newFollow from '../../helpers/NewFollow'
import newUnfollow from '../../helpers/NewUnfollow'

const Profile = () => {
    const { auth } = UseAuth()
    const [counts, setCounts] = useState({})
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [followed, setFollowed] = useState(false)
    const [error, setError] = useState('')
    const params = useParams()
    const userId = params.userId
    const avatar = user.avatar ? (Global.url + "user/avatar/" + user.avatar) : '/src/assets/img/user.png'
    const token = localStorage.getItem('token')
    const id = JSON.parse(localStorage.getItem('user'))?.id

    if (userId == id) {
        window.location.href = '/User/MyProfile'
    }

    useEffect(() => {
        getUser()
    }, [userId, token])

    useEffect(() => {
        isFollowed()
    }, [userId, auth.id, token])

    useEffect(() => {
        getPosts()
    }, [followed])

    useEffect(() => {
        getCounts()
    }, [userId, counts, token])

    const getUser = async () => {
        try {
            const response = await fetch(`${Global.url}user/getUser/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const res = await response.json()
            setUser(res.user)
        }
        catch (error) {
            setError('user')
            console.log(error)
        }
    }

    const isFollowed = async () => {
        try {
            const response = await fetch(`${Global.url}Follow/getFollow/${id}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const res = await response.json()
            if (res.status == "success") {
                setFollowed(true)
            }
            else {
                setError(res.message)
            }
        }
        catch (error) {
            setError('follow')
            console.log(error)
        }
    }

    const getPosts = async () => {
        if (followed) {
            try {
                const response = await fetch(`${Global.url}post/getPosts/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                })
                const res = await response.json()
                if (res.status == "success") {
                    setPosts(res.posts)
                }
                if (res.status == "error") {
                    setError(res.message)
                    console.log(res.message)
                }

            } catch (error) {
                setError('posts')
                console.log(error)
            }
        }
    }

    const getCounts = async () => {
        try {
            const response = await fetch(`${Global.url}user/counts/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const res = await response.json()
            if (res.status == "success") {
                setCounts(res.counts)
            }
            if (res.status == "error") {
                setError(res.message)
                console.log(res.message)
            }
        }
        catch (error) {
            setError('counts')
            console.log(error)
        }
    }

    const newChat = async () => {
        try {
            const chat = {
                user2: userId,
                user1data: {
                    name: auth.name,
                    nickName: auth.nickName,
                    avatar: auth.avatar
                },
                user2data: {
                    name: user.name,
                    nickName: user.nickName,
                    avatar: user.avatar
                },
                messages: []
            }
            const response = await fetch(`${Global.url}chat/newChat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ chat })
            })
            const res = await response.json()
            if (res.status == "success") {
                console.log(res)
                window.location.href = `/User/Chats`
            } else {
                console.log(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postsList = () => {
        return (
            posts.map((post, index) => {
                const date = new Date(post.createdAt)
                const localDate = date.toLocaleString()
                const image = post.file ? (Global.url + "post/getImg/" + post.file) : undefined

                return (
                    <div key={index} className='border-2 border-zinc-200 bg-slate-50 p-2 rounded-md '>
                        <p className='flex justify-between font-semibold'>{user.nickName} <span>{localDate}</span></p>
                        <hr />
                        <div className='flex flex-col sm:flex-row justify-between py-2'>
                            <p className=''>{post.text}</p>
                            {image && <img src={image} className='w-40 h-40 rounded-md' />}
                        </div>
                        <hr />
                        <div className='flex pt-2 justify-evenly items-center'>
                            <button>
                                <i className='fa fa-save '></i>
                            </button>
                            <button>
                                <i className='fa fa-comments '></i>
                            </button>
                            <button>
                                <i className='fa fa-heart '></i>
                            </button>
                        </div>
                    </div>
                )
            })
        )
    }

    const notFollowed = () => {
        return (
            <div className='flex w-full h-full justify-center items-center text-center border-2 border-zinc-200 bg-slate-50 p-2 rounded-md '>
                <p className='text-slate-800'>Follow this user to see his content</p>
            </div>
        )
    }

    const follow = async () => {
        try {
            const followed = {
                user: id,
                followed: userId
            }
            const res = await newFollow(followed)
            if (res.status == "success") {
                setFollowed(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unfollow = async () => {
        try {
            const followed = {
                user: id,
                followed: userId
            }
            const res = await newUnfollow(followed)
            if (res.status == "success") {
                setFollowed(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (user) {
        return (
            <>
                <div className='flex flex-col sm:flex-row gap-4 items-center text-center
                    sm:text-start'>
                    <section className='text-center space-y-1'>
                        <img src={avatar} className="h-20 w-20 rounded-full mx-auto" alt="Imagen de perfil" />
                    </section>

                    <section className=''>
                        <p className='font-bold text-xl'>{user.name}</p>
                        <p className='font-semibold'>@{user.nickName}</p>
                        <div className='flex gap-2 justify-center pt-3'>
                            {!followed ?
                                <button onClick={follow} className='bg-blue-400 text-white rounded-md px-1'>Follow</button> :
                                <button onClick={unfollow} className='bg-green-500 text-white rounded-md px-1'>Following</button>
                            }
                            <button onClick={newChat} className='bg-blue-400 text-white rounded-md px-1'>Chat</button>
                        </div>
                    </section>
                </div>

                <section className='flex justify-evenly pt-1 sm:pt-3'>
                    <p className='font-semibold'>Posts: {counts.posts}</p>
                    <p className='font-semibold'>Followers: {counts.followers}</p>
                    <p className='font-semibold'>Following: {counts.following}</p>
                </section>

                <section className='overflow-y-scroll h-[40vh] sm:h-[50vh] lg:h-[70vh] space-y-1 p-1'>
                    {!followed ? notFollowed() : postsList()}
                </section>
            </>
        )
    }
}

export default Profile
