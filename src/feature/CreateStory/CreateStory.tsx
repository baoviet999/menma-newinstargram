import React, { useContext, useEffect, useState } from 'react';
import Base64 from 'react-file-base64';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useAppSelector } from '../../App/hook';
import gallery from '../../assets/images/gallery.png';
import logo from '../../assets/images/logo.png';
import more from '../../assets/images/more.png';
import next from '../../assets/images/next.png';
import next1 from '../../assets/images/next1.png';
import star from '../../assets/images/star.png';
import { ReactComponent as Close } from '../../assets/svg/CloseStory.svg';
import { ReactComponent as UnMute } from '../../assets/svg/Unmute.svg';
import { ReactComponent as Mute } from '../../assets/svg/Mute.svg';
import { storyContext } from '../../Context/storyContext';
import { selectUser } from '../auth/authSlice';
import './CreateStore.scss';
const CreateStory = () => {
    const [selectedVideo, setSelectedVideo] = useState('');
    const user = useAppSelector(selectUser);
    const { createStory } = useContext(storyContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const handlePostStory = async () => {
        setLoading(true);
        await createStory({
            video: selectedVideo,
            image: '',
        });
        setLoading(false);
        navigate('/home');
    };

    const [mute , setMute] = useState(true);
    useEffect(() => {
        const video = document.querySelector('.story-video') as HTMLVideoElement;
        if (video) {
            mute ? (video.muted = true) : (video.muted = false);
        }
    }, [mute]);

    let body;
    selectedVideo !== ''
        ? (body = (
              <div className='create-story__content'>
                  {selectedVideo.split(';')[0] !== 'data:image/png' ? (
                      <video className='story-video' muted autoPlay src={selectedVideo}></video>
                  ) : (
                      <img src={selectedVideo} alt='' />
                  )}
              </div>
          ))
        : (body = (
              <div className='create-story__content'>
                  <Base64
                      type='file'
                      multiple={false}
                      onDone={({ base64 }: any) => setSelectedVideo(base64)}
                  />
              </div>
          ));
    useEffect(() => {
        const video = document.querySelector('.story-video') as HTMLVideoElement;
        if (video)
            video.onended = (e) => {
                video.currentTime = 0;
                video.play();
            };
    }, [selectedVideo]);
    const [videoDuration, setVideoDuration] = useState(0);
    useEffect(() => {
        const video = document.querySelector('.story-video') as HTMLVideoElement;
        if (video)
            video.onloadeddata = (e) => {
                setVideoDuration(video.duration);
            };
    }, [selectedVideo]);

    return (
        <div className='create-story'>
            <div className='story-page__logo'>
                <img src={logo} alt='' />
            </div>
            <div className='story-page__close' onClick={() => navigate('/home')}>
                <Close />
            </div>
            <div className='create-story__inner'>
                <div className='create-story__header'>
                    <div className='create-story__header--left'>
                        <div className='create-story__icon' onClick={() => setSelectedVideo('')}>
                            <img src={next} alt='' />
                        </div>
                    </div>
                    <div className='create-story__header--right'>
                        <div className='create-story__icon' onClick={()=> setMute(!mute)}>
                            {selectedVideo ? (!mute ? <UnMute/> : <Mute/>) :<span>Aa</span>}
                        </div>
                        <div className='create-story__icon'>
                            <img src={gallery} alt='' />
                        </div>
                        <div className='create-story__icon'>
                            <img src={star} alt='' />
                        </div>
                        <div className='create-story__icon'>
                            <img src={more} alt='' />
                        </div>
                    </div>
                </div>
                {body}
                <div className='create-story__footer'>
                    
                    {selectedVideo && (
                        <div className='create-story__progress'>
                            <div className='create-story__progress--item'>
                                <div
                                    className='create-story__progress--bar create-story__progress--active'
                                    style={{
                                        animationDuration: `${videoDuration}s`,
                                        animationPlayState: videoDuration === 0 ? 'paused' : '',
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}
                    <div className='create-story__footer--choose'>
                        <div className='create-story__footer-img'>
                            <img src={user.data.avatar} alt='' />
                        </div>
                        <span>{`Tin của ${user?.data?.nickname}`}</span>
                    </div>
                    <div className='create-story__footer--choose'>
                        <div className='create-story__footer-img'>
                            <AiFillStar fill='#fff' />
                        </div>
                        <span>Bạn thân</span>
                    </div>
                    <div className='create-story__footer--next' onClick={handlePostStory}>
                        {!loading ? <img src={next1} alt='' /> : <ClipLoader size={20} color='#000' />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateStory;
