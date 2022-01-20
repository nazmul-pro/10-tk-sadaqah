import { configureStore } from '@reduxjs/toolkit'
import shareSlice from '../screens/share/share.slice'
export const store = configureStore({
  reducer: {
    share: shareSlice
  },
})