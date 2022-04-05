import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import VideoThumbnail from 'react-video-thumbnail';
import user from '../../assets/images/user-test.jpg';
import './StoryItem.scss';


interface StoryItemProps {
    isFirst?: boolean;
    item?: any;
}

const StoryItem = ({ isFirst, item }: StoryItemProps) => {
    const navigate = useNavigate();
    let body;
    !isFirst
    ? (body = (
            <div className='story-item' onClick={() => navigate(`/story/${item.userId}`)}>
                <VideoThumbnail videoUrl={item.story[item.story.length - 1].video} snapshotAtTime={1} />
                <span>{item.story[0].user.nickname.substring(0, 10)}...</span>
            </div>
        ))
    : (body = (
            <div className='story-item' onClick={() => navigate('/create')}>
                <img src={user} alt='' />
                <span>Tin của bạn</span>
                <span className='story-item__plus'>
                    <AiOutlinePlus fill='white' />
                </span>
            </div>
        ));

    return <>{body}</>;
};

export default StoryItem;
