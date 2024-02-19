import { useState, useEffect } from 'react'
import { Global } from '../helpers/Global'
import UseAuth from '../hooks/UseAuth'

const getFollows = () => {
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [error, setError] = useState('')
    const { auth, counts } = UseAuth()
    const token = localStorage.getItem('token')

    useEffect(() => {
        getFollowers()
        getFollowing()
    }, [counts])

    const getFollowers = async () => {
        try {
            const response = await fetch(`${Global.url}follow/followers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const res = await response.json()
            setFollowers(res.follows)
        }
        catch (error) {
            setError('followers')
            console.log(error)
        }
    }
    const getFollowing = async () => {
        try {
            const response = await fetch(`${Global.url}follow/following`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const res = await response.json()
            setFollowing(res.follows)
        } catch (error) {
            setError('following')
            console.log(error)
        }
    }
    return { followers, following, error }
}

export default getFollows