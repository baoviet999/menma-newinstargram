import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../App/store';
import { StoryResponse } from '../../models/storyType';

interface StoryState {
    stories: StoryResponse[];
    allStory: StoryResponse[];
}

const initialState: StoryState = {
    stories: [],
    allStory : []
};

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        getStory(state, actions) {
            state.stories = actions.payload;
        },
        createStory(state, actions) {
            state.stories = [...state.stories, actions.payload];
        },
        getAllStory(state, actions) {
            state.allStory = actions.payload;
        }
    },
});

export const storyActions = storySlice.actions;
const storyReducer = storySlice.reducer;
export default storyReducer;

export const selectStory = (state: RootState) => state.story.stories;
export const selectAllStory = (state: RootState) => state.story.allStory;
