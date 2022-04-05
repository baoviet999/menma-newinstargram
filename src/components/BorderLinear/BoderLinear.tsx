import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './BoderLinear.scss';

interface BoderLinearProp {
    image: any;
    width: string;
    height: string;
}

const BoderLinear = ({ image, width, height }: BoderLinearProp) => {
    return (
        <div className='border-linear' style={{ width, height }}>
            <LazyLoadImage src={image} alt='' />
        </div>
    );
};

export default BoderLinear;
