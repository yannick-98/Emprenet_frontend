import { useState, useEffect, createContext } from 'react'
import { Global } from '../helpers/Global'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [counts, setCounts] = useState({})
    const [loading, setLoading] = useState(true)

    const authUser = async () => {
        const token = localStorage.getItem('token')
        const userLS = localStorage.getItem('user')
        if (!token || !userLS) {
            return false
        }
        const id = JSON.parse(userLS)?.id
        const request = await fetch(`${Global.url}user/getUser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const data = await request.json()
        setAuth(data.user)

        const requestCounts = await fetch(`${Global.url}user/counts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const dataCounts = await requestCounts.json()
        setCounts(dataCounts.counts)
    }
    useEffect(() => {
        authUser()
    }, [counts])


    return (
        <AuthContext.Provider value={{ auth, setAuth, counts, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext