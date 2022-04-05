import { UserRespose } from "./userType";

export interface StoryForm {
    video?: string;
    image?: string;
}

export interface StoryResponse {
    _id: string,
    video?: string;
    image?: string;
    user : UserRespose
}
