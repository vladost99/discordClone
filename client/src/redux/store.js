import { configureStore } from '@reduxjs/toolkit';

import user from 'redux/user/slice';
import alert from 'redux/alert/slice';
import friends from 'redux/friends/slice';
import chat from 'redux/chat/slice';
import room from 'redux/room/slice';

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false
// })

export const store = configureStore({
  reducer: {user, alert, friends, chat, room},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
