import React, { useEffect, useState } from 'react';
import './CreatePostOption.scss';
import { ReactComponent as Place } from '../../../../assets/svg/Place.svg';
import { ReactComponent as DropDown } from '../../../../assets/svg/DropDown.svg';

import Switch from 'react-switch';

const CreatePostOption = ({ image }: any) => {
    useEffect(() => {
        const option = document.querySelectorAll('.post-option__wrap');

        option.forEach((option, idx) => {
            option.addEventListener('click', () => {
                option.classList.toggle('active');
            });
        });
    }, []);

    const [checked, setChecked] = useState(false);

    return (
        <div className='post-options'>
            <div className='post-option__place'>
                <div className='post-option__wrap'>
                    <input type='text' placeholder='Thêm vị trí' />
                    <Place />
                </div>
            </div>
            <div className='post-option'>
                <div className='post-option__wrap'>
                    <span>Trợ năng</span>
                    <span id='dropdown'>
                        <DropDown />
                    </span>
                </div>
                <div className='post-option__dropdown' onClick={(e) => e.preventDefault()}>
                    <p>
                        Văn bản thay thế mô tả ảnh cho những người suy giảm thị lực. Văn bản thay thế sẽ được
                        tạo tự động cho ảnh của bạn hoặc bạn có thể tự viết.
                    </p>
                    <div className='post-option__dropdown--content'>
                        <img src={image} alt='' />
                        <input type='text' placeholder='Viết văn bản thay thế' />
                    </div>
                </div>
            </div>
            <div className='post-option'>
                <div className='post-option__wrap'>
                    <span>Cài đặt nâng cao</span>
                    <span id='dropdown-a'>
                        <DropDown />
                    </span>
                </div>
                <div className='post-option__dropdown' onClick={(e) => e.preventDefault()}>
                    <div className='post-option__dropdown--turn'>
                        <span>Tắt tính năng bình luận</span>
                        <Switch
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            onColor='#86d3ff'
                            onHandleColor='#2693e6'
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                            activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                            height={20}
                            width={48}
                            className='react-switch'
                            id='material-switch'
                        />
                    </div>
                    <p>
                        Văn bản thay thế mô tả ảnh cho những người suy giảm thị lực. Văn bản thay thế sẽ được
                        tạo tự động cho ảnh của bạn hoặc bạn có thể tự viết.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreatePostOption;
