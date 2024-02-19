import React, { useState } from 'react'
import { Global } from '../../helpers/Global'

const CreatePost = () => {
    const token = localStorage.getItem('token')
    const [text, setText] = useState(' ')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(false)
    const [textOk, setTextOk] = useState(false)
    const [imgOk, setImgOk] = useState(false)
    const [success, setSuccess] = useState(false)
    const userData = JSON.parse(localStorage.getItem('user'))

    const changeText = (e) => {
        setText(e.target.value)
    }

    const changeFile = (e) => {
        setFile(e.target.files[0].name)
        console.log(e.target.files[0].name)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!text && !file) {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 2000)
                return
            }

            const post = await fetch(`${Global.url}post/createPost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    text: text,
                    userData: JSON.stringify(userData)
                })
            })
            const res = await post.json()
            if (res.status == "error") {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 2000)
                return
            }
            setTextOk(true)

            const fileInput = document.querySelector('#file')
            if (res.status == "success" && fileInput.files[0]) {
                const formData = new FormData()
                formData.append('file1', fileInput.files[0])
                console.log(fileInput.files)
                const img = await fetch(`${Global.url}post/uploadImg/${res.post._id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`
                    },
                    body: formData
                })
                const resImg = await img.json()
                if (resImg.status == "success" || res.status == "success") {
                    setImgOk(true)
                }
            }
            if (textOk || imgOk) {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 2000)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <p className='font-semibold'>New post</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <textarea name="text" rows={2} id="" placeholder='Write something' onChange={changeText}
                    className='p-1 border rounded-md bg-slate-100'></textarea>
                <div className='space-x-1'>
                    <input type='file' name='file' id='file' onChange={changeFile}
                        className='border rounded text-sm '></input>
                </div>
                {error && <p className='text-red-500 text-xs'>You must write something or select a file</p>}
                {success && <p className='text-green-500 text-xs'>Post created successfully</p>}
                <input type="submit" value="Post" className="bg-blue-400 hover:bg-blue-500 hover:cursor-pointer text-white rounded" />
            </form>
        </>
    )
}

export default CreatePost
