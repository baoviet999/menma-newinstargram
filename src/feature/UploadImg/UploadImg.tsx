import React, { useState } from 'react';
import File64 from 'react-file-base64';

const UploadImg = () => {
    const [selectImg, setSelectImg] = useState('');
    

    const handleSubmit = (e: any) => {
        console.log('submit');
        e.preventDefault();
        uploadImage(selectImg);
    };
    const uploadImage = async (base64Encoded: any) => {
        try {
            await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64Encoded }),
                headers: { 'Content-type': 'application/json' },
            });
        } catch (error) {}
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <File64 type='file' multiple={false} onDone={({ base64 }: any) => setSelectImg(base64)} />
                <button type='submit'>Submit</button>
            </form>

            {selectImg && <video src={selectImg} style={{ width: '100px', height: '100px' }} />}
        </div>
    );
};

export default UploadImg;
