import { Global } from './Global'


const newFollow = async (followed) => {
    const token = localStorage.getItem('token')

    try {
        const request = await fetch(`${Global.url}follow/follow`, {
            method: 'POST',
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

export default newFollow