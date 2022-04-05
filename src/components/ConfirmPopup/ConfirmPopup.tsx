import React from 'react';
import './ConfirmPopup.scss';

interface ConfirmProps {
    confirmAction : ( choose : boolean ) => void
}

const ConfirmPopup = ({ confirmAction }: ConfirmProps) => {
    
    const handleChosse = ( choose : boolean) => {
        if (!confirmAction) return;
        confirmAction(choose)
    }

    return (
        <div className='confirm'>
            <div className='confirm__inner'>
                <div className='confirm__content'>
                    <h2>Bỏ bài viết?</h2>
                    <span>Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa.</span>
                </div>
                <div className='confirm__option' onClick={() => handleChosse(true)}>
                    <span className='confirm__option--cancel'>Bỏ</span>
                </div>
                <div className='confirm__option' onClick={() => handleChosse(false)}>
                    <span>Hủy</span>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
