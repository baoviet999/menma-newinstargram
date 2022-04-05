import React from 'react';
import { Picker } from 'emoji-mart';
import { ReactComponent as Emoji } from '../../../../assets/svg/Emoji.svg';

interface PostDesctionProps {
    setEmoji: (emoji: boolean) => void;
    emoji: boolean;
    postForm: any;
    setPostForm: (newPost: any) => void;
}

export const PostDescription = ({ emoji, setEmoji, postForm, setPostForm }: PostDesctionProps) => {
    return (
        <div className='create-post__status-emoji'>
            <div className='emoji' style={{ position: 'relative' }}>
                <Emoji onClick={() => setEmoji(!emoji)} />
                {emoji && (
                    <Picker
                        set='apple'
                        style={{
                            position: 'absolute',
                            bottom: '-250px',
                            right: '-250px',
                            overflow: 'hidden',
                            width: '280px',
                            height: '250px',
                        }}
                        enableFrequentEmojiSort={false}
                        onClick={(item: any, e) =>
                            setPostForm({
                                ...postForm,
                                title: postForm.title.concat(item.native),
                            })
                        }
                        sheetSize={16}
                    />
                )}
            </div>
            <span>{`${postForm.title.length}/2,200`}</span>
        </div>
    );
};
