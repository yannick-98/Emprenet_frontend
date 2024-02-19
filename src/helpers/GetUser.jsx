import { useState, useEffect } from "react"
import { Global } from "./Global"


const getUser = (userId) => {
    const [user, setUser] = useState({})
    const [error, setError] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const request = await fetch(`${Global.url}user/getUser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const res = await request.json()
        if (res.status === "success") {
            setUser(res.user)
        }
        else {
            setError(true)
        }
    }

    return { user, error }

}

export default getUser