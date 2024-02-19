import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import UseAuth from '../../hooks/UseAuth';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const { auth } = UseAuth();
    const token = localStorage.getItem('token');

    const getPosts = async () => {
        try {
            const response = await fetch(`${Global.url}post/feed`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const res = await response.json();
            if (res.status === "success") {
                setPosts(res.posts);
            }
            if (res.status === "error") {
                setError(true);
            }
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, [posts]);

    const renderItem = (post, index) => {
        let user = {}
        if (post.user._id !== auth.id) {
            user = post.user
        } else {
            user = auth
        }
        const avatar = user.avatar ? (Global.url + "user/avatar/" + user.avatar) : '/src/assets/img/user.png'
        const userLink = post.user._id !== auth.id ? `/User/Profile/${post.user._id}` : '/User/MyProfile'

        return (
            <div key={index} className='border-2 border-zinc-200 bg-slate-50 p-2 rounded-md'>
                <div className='flex justify-between items-center pb-1'>
                    <NavLink to={userLink} className='flex items-center gap-1 font-semibold'>
                        <img src={avatar} alt="" className='w-6 h-6 rounded-full' />
                        {post.user.nickName}
                    </NavLink>
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <hr />
                <div className='flex flex-col sm:flex-row justify-between pt-2 pb-1'>
                    <p>{post.text}</p>
                    {post.file && <img src={`${Global.url}post/getImg/${post.file}`} className='w-40 rounded-md' />}
                </div>
                <hr />
                <div className='flex pt-2 justify-evenly items-center'>
                    <button>
                        <i className='fa fa-save'></i>
                    </button>
                    <button>
                        <i className='fa fa-comments'></i>
                    </button>
                    <button>
                        <i className='fa fa-heart'></i>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <section className='space-y-2 p-1 h-[62vh] sm:h-[65vh] lg:h-[80vh] overflow-y-scroll'>
            {posts.map((post, index) => renderItem(post, index))}

        </section>
    );
};

export default Feed;
