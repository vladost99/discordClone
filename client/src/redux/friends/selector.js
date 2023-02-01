import { store } from 'redux/store';
export const friendsSelector = state => state.friends;

export const getFriends = () => store.getState().friends.friends;