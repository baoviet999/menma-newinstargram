import React, { useCallback, useEffect } from 'react';
import './Tab.scss';
type Props = {};

const Tab = (props: Props) => {

    //Lay ra tat ca item
    const tabs = document.querySelectorAll('.tab__item');
    //Luc click vao item nay remove class 'active' di
    const delActive = () => {
        tabs.forEach((item) => {
            item.classList.remove('active');
        });
    };
    // luc click vao item thi them 1 class 'active'
    tabs.forEach((item) => {
        item.addEventListener('click', () => {
            delActive();
            item.classList.add('active');
        });
    });
    

    return (
        <div className='tab'>
            <div className='tab__item'>item1</div>
            <div className='tab__item'>item2</div>
            <div className='tab__item'>item3</div>
            <div className='tab__item'>item4</div>
            <div className='tab__item'>item5</div>
        </div>
    );
};

export default Tab;


