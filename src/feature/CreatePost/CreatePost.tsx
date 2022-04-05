import 'emoji-mart/css/emoji-mart.css';
import React, { useContext, useState } from 'react';
import FileBase from 'react-file-base64';
import { useAppDispatch, useAppSelector } from '../../App/hook';
import { ReactComponent as AddImg } from '../../assets/svg/AddImg.svg';
import { ReactComponent as ChooseImg } from '../../assets/svg/ChooseImg.svg';
import { ReactComponent as CloseModal } from '../../assets/svg/CloseModal.svg';
import { ReactComponent as Full } from '../../assets/svg/Full.svg';
import { ReactComponent as Prevbtn } from '../../assets/svg/Prevbtn.svg';
import { ReactComponent as Zoom } from '../../assets/svg/Zoom.svg';
import ConfirmPopup from '../../components/ConfirmPopup/ConfirmPopup';
import Toast from '../../components/Toast/Toast';
import { postContext } from '../../Context/postContext';
import { SIZE } from '../../data/Size';
import { selectUser } from '../auth/authSlice';
import CreatePostOption from './Components/CreatePostOprions/CreatePostOption';
import { PostDescription } from './Components/PostDescription/PostDescription';
import './CreatePost.scss';
import { postActions } from './postSlice';

const CreatePost = () => {
    const [active, setActive] = useState(false);
    const [openset, setOpenSet] = useState(false);
    const [size, setSize] = useState('full');
    const [emoji, setEmoji] = useState(false);
    const [openCofirm, setOpenConfirm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const dispatch = useAppDispatch();

    const handleCloseWrong = (e: any) => {
        e.stopPropagation();
    };
    const [postForm, setPostForm] = useState({
        title: '',
        description: '',
        image: '',
    });

    const handleCloseModal = () => {
        const { title, description, image } = postForm;
        if (title !== '' || description !== '' || image !== '') {
            setOpenConfirm(true);
        } else {
            dispatch(postActions.setModal(false));
        }
    };
    const handleConfirmPopup = (choose: boolean) => {
        choose ? dispatch(postActions.setModal(false)) : dispatch(postActions.setModal(true));
        setOpenConfirm(false);
    };
    const { createPost } = useContext(postContext);

    const handleCreatePost = async () => {
        setUploading(true);
        const data: any = await createPost(postForm);
        data?.success
            ? Toast({ message: 'Create post successfully!!!' })
            : Toast({ message: data.message, a: 'error' });
        setUploading(false);
        data?.success && dispatch(postActions.setModal(false)) 
    };
    //Header
    let header;
    postForm.image !== ''
        ? (header = (
              <div className='create-post__nextstep create-post__header'>
                  <Prevbtn onClick={() => setActive(false)} />
                  <span>Cắt</span>
                  {!active ? (
                      <span onClick={() => setActive(!active)}>Tiếp</span>
                  ) : (
                      <span onClick={handleCreatePost}>Chia sẻ {uploading && 'laodinggggggg'}</span>
                  )}
              </div>
          ))
        : (header = (
              <div className='create-post__header'>
                  <span>Tạo bài viết mới</span>
              </div>
          ));
    // body

    const mainUser = useAppSelector(selectUser);

    return (
        <>
            <div className='create-post' onClick={() => handleCloseModal()}>
                <div className='create-post__inner' onClick={handleCloseWrong}>
                    {header}
                    {postForm.image !== '' ? (
                        <div className='create-post__step2'>
                            <div className='create-post__wrap'>
                                <div className='create-post__img'>
                                    <img src={postForm.image} alt='' className={`img ${size}`} />
                                </div>
                                {!active && (
                                    <div className='create-post__options'>
                                        <div className='create-post__options--left'>
                                            <div className='create-post__option'>
                                                <Full onClick={() => setOpenSet(!openset)} />
                                                {openset && (
                                                    <div className='create-post__option--full'>
                                                        {SIZE.map((item, idx) => (
                                                            <button
                                                                onClick={() => setSize(item.name)}
                                                                key={idx}
                                                                className={`${
                                                                    item.name === size ? 'active' : ''
                                                                }`}
                                                            >
                                                                <span>{item.name}</span>
                                                                <item.img />
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className='create-post__option'>
                                                <Zoom />
                                            </div>
                                        </div>
                                        <div className='create-post__options--right'>
                                            <div className='create-post__option'>
                                                <AddImg />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={`create-post__status ${active ? 'active' : ''}`}>
                                <div className='create-post__status-header'>
                                    <img src={mainUser.data.avatar} alt='' />
                                    <span>{mainUser.data.nickname}</span>
                                </div>
                                <div className='create-post__status-content'>
                                    <textarea
                                        placeholder='Viết chú thích...'
                                        autoComplete='false'
                                        autoCorrect='false'
                                        className='area'
                                        value={postForm.title}
                                        onChange={(e) =>
                                            setPostForm({
                                                ...postForm,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                    {/* Post title and desction */}
                                    <PostDescription
                                        emoji={emoji}
                                        setEmoji={setEmoji}
                                        postForm={postForm}
                                        setPostForm={setPostForm}
                                    />
                                </div>
                                <CreatePostOption image={postForm.image} />
                            </div>
                        </div>
                    ) : (
                        <div className='create-post__place'>
                            <div className='create-post__choose'>
                                <ChooseImg />
                            </div>
                            <h3>Kéo ảnh và video vào đây</h3>
                            <button>
                                Chọn từ máy tính{' '}
                                <FileBase
                                    type='file'
                                    multiple={false}
                                    onDone={({ base64 }: any) => setPostForm({ ...postForm, image: base64 })}
                                />{' '}
                            </button>
                        </div>
                    )}
                </div>
                <div className='create-post__close'>
                    <CloseModal />
                </div>
            </div>
            {openCofirm && <ConfirmPopup confirmAction={handleConfirmPopup} />}
        </>
    );
};

export default CreatePost;
