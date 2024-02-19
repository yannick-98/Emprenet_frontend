import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global'
import UseAuth from '../../hooks/UseAuth'
import { NavLink } from 'react-router-dom'


const People = () => {
    const { auth, counts } = UseAuth()
    const token = localStorage.getItem('token')
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [discover, setDiscover] = useState([])
    const [list, setList] = useState('followers')
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('')

    useEffect(() => {
        getDiscover()
        getFollowers()
        getFollowing()
    }, [])

    const getDiscover = async () => {
        try {
            const response = await fetch(`${Global.url}user/getUsers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            const res = await response.json()
            if (res.status == "success") {
                setDiscover(res.users)
            }
        } catch (error) {
            console.log(error)
        }
    }
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

    const discoverList = () => {
        if (!searchQuery.length > 0) {
            return (
                <div className='flex items-center justify-center text-center w-full'>
                    <p className='text-gray-400'>Enter a name to search for a user </p>
                </div>
            )
        }

        const filtered = discover.filter(user => {
            const lowerCaseName = user.name.toLowerCase();
            const lowerCaseNickName = user.nickName.toLowerCase();
            const lowerCaseSearchQuery = searchQuery.toLowerCase();
            return (
                lowerCaseName.includes(lowerCaseSearchQuery) ||
                lowerCaseNickName.includes(lowerCaseSearchQuery)
            );
        });
        const list = filtered.map((user, index) => {
            const userLink = user._id !== auth.id ? `/User/Profile/${user._id}` : '/User/MyProfile'
            const avatar = user.avatar ? (Global.url + "user/avatar/" + user.avatar) : '/src/assets/img/user.png'
            return <UserCard user={user} userLink={userLink} avatar={avatar} key={index} />
        })
        return list
    }

    const followersList = () => {
        if (!followers || followers.length === 0) {
            return <p className='text-gray-400'>No followers</p>
        }
        const filtered = followers.filter(follow => {
            const lowerCaseName = follow.userData.name.toLowerCase();
            const lowerCaseNickName = follow.userData.nickName.toLowerCase();
            const lowerCaseSearchQuery = searchQuery.toLowerCase();
            return (
                lowerCaseName.includes(lowerCaseSearchQuery) ||
                lowerCaseNickName.includes(lowerCaseSearchQuery)
            );
        });
        const list = filtered.map((follow, index) => {
            const user = follow.userData
            const userLink = follow.user !== auth.id ? `/User/Profile/${follow.user}` : '/User/MyProfile'
            const avatar = user.avatar ? (Global.url + "user/avatar/" + user.avatar) : '/src/assets/img/user.png'
            return <UserCard user={user} userLink={userLink} avatar={avatar} key={index} />
        })
        return list
    }

    const followingList = () => {
        if (!following || following.length === 0) {
            return <p className='text-gray-400'>No following</p>
        }
        const filtered = following.filter(follow => {
            const lowerCaseName = follow.followedData.name.toLowerCase();
            const lowerCaseNickName = follow.followedData.nickName.toLowerCase();
            const lowerCaseSearchQuery = searchQuery.toLowerCase();
            return (
                lowerCaseName.includes(lowerCaseSearchQuery) ||
                lowerCaseNickName.includes(lowerCaseSearchQuery)
            );
        });
        const list = filtered.map((follow, index) => {
            const user = follow.followedData
            const userLink = follow.followed !== auth.id ? `/User/Profile/${follow.followed}` : '/User/MyProfile'
            const avatar = user.avatar ? (Global.url + "user/avatar/" + user.avatar) : '/src/assets/img/user.png'
            return <UserCard user={user} userLink={userLink} avatar={avatar} key={index} />

        })
        return list
    }


    const showList = () => {
        switch (list) {
            case 'discover':
                return discoverList()
            case 'followers':
                return followersList()
            case 'following':
                return followingList()
            default:
                return discoverList()
        }
    }

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const selectFollowers = () => {
        setList('followers')
    }
    const selectFollowing = () => {
        setList('following')
    }

    const selectDiscover = () => {
        setList('discover')
    }

    const bgColor = (option) => {
        if (option === list) {
            return 'bg-blue-100'
        }
    }

    return (
        <div className='space-y-1'>
            <section className='flex border rounded-lg'>
                <button onClick={selectDiscover} className={`w-1/2 rounded-lg ${bgColor('discover')}`}>Discover</button>
                <button onClick={selectFollowers} className={`w-1/2 rounded-lg ${bgColor('followers')}`}>Followers</button>
                <button onClick={selectFollowing} className={`w-1/2 rounded-lg ${bgColor('following')}`}>Following</button>
            </section>
            <section className=' border rounded p-1'>
                <input
                    type="text"
                    placeholder="Ingrese su búsqueda"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className='w-full text-center'
                />
            </section>
            <section className='flex flex-wrap border rounded-lg p-1'>
                {showList()}
            </section>
        </div>
    )
}

const UserCard = ({ user, userLink, avatar }) => {
    return (
        <div className='w-1/3 flex flex-col items-center justify-center'>
            <div>
                <img src={avatar} alt={user.nickName} className='w-24 h-24 p-1 rounded-full' />
            </div>
            <div className='flex flex-col items-center text-center'>
                <p className='text-lg font-bold'>{user.name}</p>
                <p className='text-sm'>@{user.nickName}</p>
            </div>
            <div className='pt-2'>
                <NavLink to={userLink} className='bg-blue-400 rounded-lg px-2'>Visit</NavLink>
            </div>
        </div>
    )
}

export default People
