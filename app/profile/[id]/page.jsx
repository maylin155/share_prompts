"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = ({params}) => {

    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if (params.id)
            fetchPosts();
    }, [])

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page.`}
            data={posts}
        />
    )
}

export default UserProfile