import React from 'react';
import './User.scss';
import user1 from '../../assets/images/user-test.jpg';
import TimeAgo from 'react-timeago';
interface UserProps {
    user: {
        fullname?: string;
        nickname?: string;
        username?: string;
        avatar?: string;
        timeLogOut?: string;
    };
}

const User = ({ user }: UserProps) => {
    return (
        <div className='user'>
            <div className='user__info'>
                <img src={user.avatar ? user.avatar : user1} alt='' />
                <div className='user__status'>
                    <h4>{user.nickname}</h4>
                    {user.timeLogOut !== '' ? (
                        <span>
                            active{' '}
                            <TimeAgo  date={user.timeLogOut} />
                        </span>
                    ) : (
                        <span>Đang hoạt động</span>
                    )}
                </div>
            </div>
            <div className='user__follow'>
                <span>Theo dõi</span>
            </div>
        </div>
    );
};

export default User;
