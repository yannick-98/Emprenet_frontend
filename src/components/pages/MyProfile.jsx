import React, { useEffect, useState } from 'react'
import UseAuth from '../../hooks/UseAuth'
import { Global } from '../../helpers/Global'
import useForm from '../../hooks/useForm'
import UserImg from '../../assets/img/user.png'

const MyProfile = () => {
    const { auth, counts } = UseAuth()
    const [myPosts, setMyPosts] = useState([])
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')
    let { form, changed } = useForm({})
    const avatar = auth.avatar ? (Global.url + "user/avatar/" + auth.avatar) : UserImg
    const token = localStorage.getItem('token')

    const openEdit = () => {
        setEdit(!edit)
    }

    const getMyPosts = async () => {
        try {
            const response = await fetch(`${Global.url}post/getPosts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const res = await response.json()
            if (res.status == "success") {
                setMyPosts(res.posts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMyPosts()
    }, [myPosts])

    const postsList = () => {
        return (
            myPosts.map((post, index) => {
                const date = new Date(post.createdAt)
                const localDate = date.toLocaleString()
                const image = post.file ? (Global.url + "post/getImg/" + post.file) : undefined

                return (
                    <div key={index} className='border-2 border-zinc-200 bg-slate-50 p-2 rounded-md '>
                        <p className='flex justify-between font-semibold'>{auth.nickName} <span>{localDate}</span></p>
                        <hr />
                        <div className='flex flex-col sm:flex-row justify-between py-2'>
                            <p className=''>{post.text}</p>
                            {image && <img src={image} className='w-40 h-40 rounded-lg' />}
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

            }
            )
        )
    }

    const editProfile = () => {

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                if (form.file0) {
                    const fileInput = document.querySelector('#file0')
                    const file = fileInput.files[0]
                    let formData = new FormData()
                    formData.append('file0', file)
                    const response = await fetch(`${Global.url}user/uploadAvatar`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `${token}`
                        },
                        body: formData
                    })
                    const res = await response.json()
                    if (res.status == "error") {
                        setError(res.message)
                        setTimeout(() => {
                            setError('')
                        }, 3000)
                    } else {
                        setEdit(false)
                    }
                }
                if (!form.name && !form.nickName && !form.email && !form.password) return
                const data = {
                    name: form.name ? form.name : auth.name,
                    nickName: form.nickName ? form.nickName : auth.nickName,
                    email: form.email ? form.email : auth.email,
                    password: form.password,
                }
                const response = await fetch(`${Global.url}user/updateUser`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify(data)
                })
                const res = await response.json()
                console.log(res)
                form = {}
            } catch (error) {
                console.log(error)
            }
        }
        return (
            <div className='border-2 border-zinc-200 bg-slate-50 p-2 rounded-md text-sm'>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
                    <label >Name</label>
                    <input onChange={changed} autoComplete='name' type="text" name="name" id="name" />
                    <label >NickName</label>
                    <input onChange={changed} autoComplete='nickname' type="text" name="nickName" id="nickName" />
                    <label >Email</label>
                    <input onChange={changed} autoComplete='email' type="email" name="email" id="email" />
                    <label >Password</label>
                    <input onChange={changed} autoComplete='current-password' type="password" name="password" id="password" />
                    <label >Avatar</label>
                    <input onChange={changed} type="file" name="file0" id="file0" />
                    {error && <p className='text-red-500'>{error}</p>}
                    <button type='submit' className='bg-blue-500 text-white rounded-md'>Save</button>
                </form>
            </div>
        )
    }

    return (
        <>
            <div className='flex flex-col sm:flex-row  gap-4 items-center text-center
                    sm:text-start'>
                <section className='text-center space-y-1'>
                    <img src={avatar} className="h-20 w-20 rounded-full mx-auto" alt="Imagen de perfil" />
                </section>

                <section>
                    <p className='font-bold text-xl'>{auth.name}</p>
                    <p className='font-semibold'>@{auth.nickName}</p>
                    <div className='pt-3'>
                        <button onClick={openEdit} className='mx-auto p-1 rounded text-xs  bg-blue-400 text-white'>Edit profile</button>
                    </div>
                </section>
            </div>

            <section className='flex justify-evenly'>
                <p className='font-semibold'>Posts: {counts.posts}</p>
                <p className='font-semibold'>Followers: {counts.followers}</p>
                <p className='font-semibold'>Following: {counts.following}</p>
            </section>

            <section className='overflow-y-scroll h-[40vh] sm:h-[45vh] lg:h-[70vh] p-1 space-y-1'>
                {edit ? editProfile() : postsList()}
            </section>
        </>
    )
}

export default MyProfile
