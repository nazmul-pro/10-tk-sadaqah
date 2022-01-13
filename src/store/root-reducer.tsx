import {combineReducers} from "@reduxjs/toolkit"
import {shareSlice} from "./slices/share.slice"

export const rootReducer = combineReducers({
    share: shareSlice.reducer
})