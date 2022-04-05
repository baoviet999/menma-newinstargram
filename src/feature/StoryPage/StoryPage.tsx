import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { useAppSelector } from '../../App/hook';
import logo from '../../assets/images/logo.png';
import { ReactComponent as Close } from '../../assets/svg/CloseStory.svg';
import { ReactComponent as MoreOption } from '../../assets/svg/MoreOption.svg';
import { ReactComponent as Mute } from '../../assets/svg/Mute.svg';
import { ReactComponent as Pause } from '../../assets/svg/Pause.svg';
import { ReactComponent as Play } from '../../assets/svg/Play.svg';
import { ReactComponent as Right } from '../../assets/svg/Right.svg';
import { ReactComponent as UnMute } from '../../assets/svg/Unmute.svg';
import { storyContext } from '../../Context/storyContext';
import './StoryPage.scss';
import { selectAllStory } from './storySlice';
import { motion, AnimatePresence } from 'framer-motion';

const StoryPage = () => {
    const { id } = useParams();
    const videoList = useAppSelector(selectAllStory);
    const storyList: any = videoList.find((x: any) => x.userId === id);
    const storySelect = [...storyList.story].reverse();

    const navigate = useNavigate();
    const { getPostList, getAllStory } = useContext(storyContext);

    useEffect(() => {
        getPostList();
    }, []);
    useEffect(() => {
        getAllStory();
    }, []);

    //hadle next video
    const [story, setStory] = useState(0);
    const storyIndexRef = useRef(0);
    useEffect(() => {
        const video = document.getElementById('video') as HTMLVideoElement;
        if (video) {
            video.onended = (e) => {
                if (storyIndexRef.current === storySelect.length - 1) {
                    setStory(0);
                } else {
                    setStory((prev) => prev + 1);
                }
            };
        }
    }, []);
    useEffect(() => {
        storyIndexRef.current = story;
    }, [story]);
    //

    //handlepause
    const [pauseVideo, setPauseVideo] = useState(false);
    useEffect(() => {
        const video = document.getElementById('video') as HTMLVideoElement;
        if (video) {
            pauseVideo ? video.pause() : video.play();
        }
    });
    //hadle mute
    const [muted, setMute] = useState(false);
    useEffect(() => {
        const video = document.getElementById('video') as HTMLVideoElement;
        if (video) !muted ? (video.muted = true) : (video.muted = false);
    });
    //hadle progress
    const handleProgerss = (index: number) => {
        if (index < story) {
            return 'story-page__progress-bar story-page__progress-bar--finish';
        } else if (index === story) {
            return 'story-page__progress-bar story-page__progress-bar--active';
        } else {
            return 'story-page__progress-bar';
        }
    };

    // handle video duration
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        const video = document.getElementById('video') as HTMLVideoElement;
        if (video) {
            video.onloadedmetadata = (e) => {
                setCurrentTime(video.duration);
            };
        }
    }, []);

    const containerVarian = {
        hidden: {
            opacity: 0,
            x: '-1000px',
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 120,
                duration: 0.4
            },
        },
        exit: {
            x: '200',
            opacity: 0,
        },
    };

    return (
        <div className='story-page'>
            <div className='story-page__inner'>
                {!(story <= 0) && (
                    <div
                        className='story-page__btn story-page__btn--left'
                        onClick={() => setStory((prev) => prev - 1)}
                    >
                        <Right />
                    </div>
                )}
                {!(story === storySelect.length - 1) && (
                    <div
                        className='story-page__btn story-page__btn--right'
                        onClick={() => setStory((prev) => prev + 1)}
                    >
                        <Right />
                    </div>
                )}
                <AnimatePresence>
                    <motion.video
                        // key={story}
                        variants={containerVarian}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        onMouseDown={(e) => setPauseVideo(true)}
                        onMouseUp={(e) => setPauseVideo(false)}
                        id='video'
                        autoPlay
                        muted
                        src={storySelect[story]?.video}
                    ></motion.video>
                </AnimatePresence>
                <div className='story-page__header'>
                    <div className='story-page__progress'>
                        {storySelect.map((item: any, idx: number) => (
                            <div key={idx} className='story-page__progress-item'>
                                <div
                                    style={{
                                        animationDuration: `${currentTime}s`,
                                        animationPlayState: `${pauseVideo ? 'paused' : ''}`,
                                    }}
                                    className={handleProgerss(idx)}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <div className='story-page__info'>
                        <img src={storySelect[0].user.avatar} alt='' />
                        <span className='story-page__info-name'>{storySelect[0].user.nickname}</span>
                        <span className='story-page__info-time'>
                            <TimeAgo date={storySelect[story].createdAt} />
                        </span>
                    </div>
                    <div className='story-page__options'>
                        <div className='story-page__option' onMouseDown={(e) => setPauseVideo(!pauseVideo)}>
                            {pauseVideo ? <Play /> : <Pause />}
                        </div>
                        <div className='story-page__option' onMouseDown={(e) => setMute(!muted)}>
                            {muted ? <UnMute /> : <Mute />}
                        </div>
                        <div className='story-page__option'>
                            <MoreOption />
                        </div>
                    </div>
                </div>
            </div>
            <div className='story-page__logo'>
                <img src={logo} alt='' />
            </div>
            <motion.div whileHover={{scale : 1.12 }} className='story-page__close' onClick={() => navigate('/home')}>
                <Close />
            </motion.div>
        </div>
    );
};

export default StoryPage;
