import axios from 'axios';
import { createContext, ReactNode } from 'react';
import { useAppDispatch } from '../App/hook';
import { TOKEN, URL } from '../constants/common';
import { storyActions } from '../feature/StoryPage/storySlice';
import { StoryForm } from '../models/storyType';
import setHeader from '../utils/setHeader';

interface StoryContextProps {
    children: ReactNode;
}

export const storyContext = createContext({
    createStory(storyForm: StoryForm) {},
    getPostList() {},
    getAllStory() {},
});

export default function StoryContextProvider({ children }: StoryContextProps) {
    const dispatch = useAppDispatch();

    const createStory = async (storyForm: StoryForm) => {
        try {
            const data = await axios.post(`${URL}/story`, storyForm);
            if (data.data.success) dispatch(storyActions.createStory(data.data.data));
            return data;
        } catch (error) {}
    };

    const getPostList = async () => {
        setHeader(localStorage[TOKEN]);
        try {
            const data = await axios.get(`${URL}/story`);
            if (data.data.success) dispatch(storyActions.getStory(data.data.data));
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };
    const getAllStory = async () => {
        setHeader(localStorage[TOKEN]);
        try {
            const data = await axios.get(`${URL}/story/all`);
            const groupBy = (x: any, f: any) =>
                x.reduce((a: any, b: any) => ((a[f(b)] ||= []).push(b), a), {});
            const newData = groupBy(data.data.data, (x: any) => x.user._id);
            const storyGroup = Object.entries(newData);
            const endCodedUser = storyGroup.map((item: any) => {
                const userId = item[0];
                const story = item[1].map((x: any) => ({
                    user: x.user,
                    video: x.video,
                    createdAt: x.createdAt,
                }));
                return {
                    userId,
                    story,
                };
            });

            if (data.data.success) dispatch(storyActions.getAllStory(endCodedUser));
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };
    const storyContextData = { createStory, getPostList, getAllStory };
    return <storyContext.Provider value={storyContextData}>{children}</storyContext.Provider>;
}
