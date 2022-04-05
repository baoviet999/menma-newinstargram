import React from 'react';
import { motion } from 'framer-motion';

const MotionPage = ({ children }: any) => {
    const containerVariant = {
        hidden: {
            x: '-100vw',
            opacity : 0
        },
        visible: {
            x: '0vw',
            opacity : 1,
            transition: {
                delay: 0.3,
                duration: 0.3,
            },
        },
        end: {
            x: '100vw',
            opacity : 0
        },
    };
    return (
        <motion.div variants={containerVariant} initial='hidden' animate='visible' exit='end'>
            {children}
        </motion.div>
    );
};

export default MotionPage;
