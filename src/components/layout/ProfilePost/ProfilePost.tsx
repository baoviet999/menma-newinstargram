import React, { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { authContext } from '../../../Context/authContext';
import { postContext } from '../../../Context/postContext';
import './ProfilePost.scss';
const ProfilePost = () => {
    const { getUserPost } = useContext(postContext);
    const [userPost, setUserPost] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await getUserPost();
            setUserPost(data);
            setLoading(false);
        })();
    }, []);
    const posts = userPost || [];
    return (
        <div className='profile-post'>
            <div className='grid'>
                <div className='row'>
                    {posts.map((item: any, idx: number) => (
                        <div className='col l-4' key={idx}>
                            <div className='profile-post__img'>
                                <LazyLoadImage width='295px' height='295px' src={item.image} alt='' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePost;
