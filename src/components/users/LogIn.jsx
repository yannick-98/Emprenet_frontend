import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import useForm from '../../hooks/useForm'
import { Global } from '../../helpers/Global'

const LogIn = () => {
    const { form, changed } = useForm({})
    const [error, setError] = useState('')
    const [logged, setLogged] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.Email || !form.CurrentPassword) {
            setError('All fields are required')
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        let user = {
            email: form.Email,
            password: form.CurrentPassword,
        }
        const request = await fetch(`${Global.url}user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await request.json()
        if (data.status === 'error') {
            setError(data.message)
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setLogged(true)
        setTimeout(() => {
            window.location.href = '/User'
        }, 1000)
    }

    const buttonColor = !logged ? 'bg-blue-500 hover:bg-blue-400' : 'bg-green-500'
    return (
        <div className='w-full flex flex-col items-center justify-center pt-20 space-y-10'>
            <h1 className='text-4xl font-bold'>Log In</h1>
            <form className='sm:w-1/2 max-w-[500px] flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' name='Email' onChange={changed}
                    className='w-full h-10 my-2 px-2 border-2 border-gray-400 rounded-md outline-none' />

                <input type='password' placeholder='Password' name='CurrentPassword' onChange={changed}
                    className='w-full h-10 my-2 px-2 border-2 border-gray-400 rounded-md outline-none' />

                {error &&
                    <p className='w-full py-1 my-5 mx-auto text-red-500 font-bold text-center'>{error}</p>}

                <button type='submit' className={`${buttonColor} w-full py-1 my-5 mx-auto border-2 border-gray-400 rounded-md 
                    outline-none text-white font-bold text-center`}>
                    Log In
                </button>

                <p className='text-start w-full'>Forgot password? <NavLink to='/' className='text-blue-500'>Click here</NavLink></p>
                <p className='text-start w-full'>Don't have an account? <NavLink to='/SignUp' className='text-blue-500'>Creacte free account</NavLink></p>

            </form>
        </div>
    )
}

export default LogIn
