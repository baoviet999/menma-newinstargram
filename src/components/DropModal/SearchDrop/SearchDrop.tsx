import React, { forwardRef } from 'react';
import all from '../../../assets/images/full.png';
import './SearchDrop.scss';
import { ReactComponent as Tick } from '../../../assets/svg/tik.svg';
import { ReactComponent as DropClose } from '../../../assets/svg/DropClose.svg';
import user1 from '../../../assets/images/search1.jpg';
import BoderLinear from '../../BorderLinear/BoderLinear';

const SearchDrop = forwardRef((props, ref: any) => {
    // const handleEvent = (e: any) => {
    //     e.stopImmediatePropagation();
    //     console.log('e')
    // };
    return (
        <div className='search-drop' ref={ref}>
            <div className='search-drop__header'>
                <h4>Gần đây</h4>
                <span>Xóa tất cả</span>
            </div>
            <div className='search-drop__content'>
                <SearchDropItem />
            </div>
        </div>
    );
});

const SearchDropItem = () => {
    return (
        <div className='drop-item'>
            <div className='drop-item__info'>
                {/* <div className='drop-item__img'>
                    <img src={user1} alt='' />
                </div> */}
                <BoderLinear image={user1} width='44px' height='44px' />
                <div className='drop-item__name'>
                    <div>
                        <p>cristiano </p>
                        <Tick />
                    </div>
                    <div className='drop-item__status'>
                        <span>Cristiano Ronaldo - Đang theo dõi</span>
                    </div>
                </div>
            </div>
            <div className='drop-item__close'>
                <DropClose />
            </div>
        </div>
    );
};

export default SearchDrop;
