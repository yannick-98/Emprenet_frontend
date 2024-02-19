import React from 'react'
import useForm from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'


const SignUp = () => {
    const { form, changed } = useForm({})
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.Email || !form.Name || !form.Nickname || !form.Password1 || !form.Password2) {
            setError('Please fill all the fields')
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        if (form.Password1 !== form.Password2) {
            setError('Passwords do not match')
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        if (form.Password1.length < 6) {
            setError('Password must be at least 6 characters')
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        let newUser = {
            name: form.Name,
            nickName: form.Nickname,
            email: form.Email,
            password: form.Password1
        }
        const request = await fetch(`${Global.url}user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        const data = await request.json()
        console.log(data)
    }

    return (
        <div className='w-full flex flex-col items-center justify-center pt-20 space-y-10'>
            <h1 className='text-4xl font-bold'>New account</h1>
            <form className='sm:w-1/2 max-w-[500px] flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                <input type='text' placeholder='Name' name='Name' onChange={changed}
                    className='w-full h-10 my-2 px-2 border-2 border-gray-400 rounded-md outline-none' />

                <input type='text' placeholder='Nickname' name='Nickname' onChange={changed}
                    className='w-full h-10 my-2 px-2 border-2 border-gray-400 rounded-md outline-none' />

                <input type='email' placeholder='Email' name='Email' onChange={changed}
                    className='w-full h-10 my-2 px-2 border-2 border-gray-400 rounded-md outline-none' />

                <input type='password' placeholder='Password' name='Password1' onChange={changed}
                    className='w-full h-10 my-2 px-2 border-2 border-gray-400 rounded-md outline-none' />

                <input type='password' placeholder='Confirm password' name='Password2' onChange={changed}
                    className='w-full h-10 my-2 px-2 border-2 border-gray-400 rounded-md outline-none' />

                {error &&
                    <p className='w-full py-1 my-5 mx-auto text-red-500 font-bold text-center'>{error}</p>}

                <button type='submit' className='w-full py-1 my-5 mx-auto border-2 border-gray-400 rounded-md 
                    outline-none bg-blue-500 hover:bg-blue-400 text-white font-bold text-center'>Sign Up</button>

                <p className='text-start w-full'>Have an account? <NavLink to='/LogIn' className='text-blue-500'>Log in</NavLink></p>

            </form>
        </div>
    )
}

export default SignUp
