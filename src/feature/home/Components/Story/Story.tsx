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
    let el = document.getElementById('result');

    const [width, setWidth] = useState(7.5);

    useEffect(() => {
        window.addEventListener(
            'resize',
            function () {
                console.log(window.innerWidth);
                window.innerWidth < 700 ? setWidth(5) : setWidth(7.5);
            },
            true
        );
    }, []);

    return (
        <div className='story'>
            <div className='story__inner'>
                {loading ? (
                    <Swiper
                        grabCursor
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.story__next',
                            prevEl: '.story__prev',
                        }}
                        spaceBetween={10}
                        slidesPerView={7.5}
                        loopFillGroupWithBlank={true}
                        breakpoints={{
                            600: {
                                slidesPerView: 7.5,
                            },
                            960: {
                                slidesPerView: 7.5,
                            },
                        }}
                    >
                        {Array.from(Array(10)).map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <StorySelekon />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <Swiper
                        grabCursor
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.story__next',
                            prevEl: '.story__prev',
                        }}
                        spaceBetween={15}
                        slidesPerView={7.5}
                        breakpoints={{
                            320: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 7.5,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <StoryItem isFirst={true} />
                        </SwiperSlide>
                        {storyListReverse.map((item: any, idx: number) => (
                            <SwiperSlide key={idx}>
                                <StoryItem item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
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
