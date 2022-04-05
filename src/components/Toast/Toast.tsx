import React from 'react';
import { toast } from 'react-toastify';

interface ToastProps {
    message: string;
    a?: 'success' | 'warning' | 'error' | 'default';
}

const Toast = ({ message, a = 'default' }: ToastProps) =>
    toast(`🦄 ${message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        type: a,
    });

export default Toast;
