import { Global } from './Global'


const newUnfollow = async (followed) => {
    const token = localStorage.getItem('token')

    try {
        const request = await fetch(`${Global.url}follow/unfollow`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(followed)
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error)
    }
}

export default newUnfollow