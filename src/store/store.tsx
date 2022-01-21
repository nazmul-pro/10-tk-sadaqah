import { configureStore } from '@reduxjs/toolkit'
import donateSlice from '../screens/donate/donate.slice'
import shareSlice from '../screens/share/share.slice'
export const store = configureStore({
  reducer: {
    share: shareSlice,
    donate: donateSlice,
  },
})