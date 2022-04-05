import React, { useContext, useEffect, useState } from 'react';
import './Story.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import StoryItem from '../../../../components/StoryItem/StoryItem';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { storyContext } from '../../../../Context/storyContext';
import { useAppSelector } from '../../../../App/hook';
import { selectAllStory } from '../../../StoryPage/storySlice';
import StorySelekon from '../../../../components/StoryItem/StorySelekon/StorySelekon';
const Story = () => {
    const { getAllStory } = useContext(storyContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            await getAllStory();
            setLoading(false);
        })();
    }, []);

    const storyList: any = useAppSelector(selectAllStory);
    const storyListReverse = [...storyList].reverse();
    return (
        <div className='story'>
            <Swiper
                grabCursor
                modules={[Navigation]}
                navigation={{
                    nextEl: '.story__next',
                    prevEl: '.story__prev',
                }}
                spaceBetween={10}
                slidesPerView={7.5}
            >
                {loading ? (
                    <>
                        {Array.from(Array(10)).map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <StorySelekon />
                            </SwiperSlide>
                        ))}
                    </>
                ) : (
                    <>
                        <SwiperSlide>
                            <StoryItem isFirst={true} />
                        </SwiperSlide>
                        {storyListReverse.map((item: any, idx: number) => (
                            <SwiperSlide key={idx}>
                                <StoryItem item={item} />
                            </SwiperSlide>
                        ))}
                    </>
                )}
            </Swiper>
            <div className='story__btn story__next'>
                <div className='story__btn-icon'>
                    <MdOutlineNavigateNext />
                </div>
            </div>
            <div className='story__btn story__prev'>
                <div className='story__btn-icon'>
                    <MdOutlineNavigateNext />
                </div>
            </div>
        </div>
    );
};

export default Story;
