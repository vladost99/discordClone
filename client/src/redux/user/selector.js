import { store } from 'redux/store';

export const userSelector = state => state.user;

export const getUserId = () => store.getState().user.userDetails.user._id;