import { createSlice } from '@reduxjs/toolkit'

const shareSlice = createSlice({
  name: 'share',
  initialState: [],
  reducers: {
    setSelectedContacts(state, action) { 
      // console.log('start');
             
      const phnIdx = state.findIndex(p => p?.phoneNumbers[0]?.number === action.payload?.phoneNumbers[0]?.number);
      
      console.log('idx');
      if (phnIdx > -1) {
        state.splice(phnIdx, 1);
        // console.log('splice');

      }
      else {
        state.push(action.payload)
        // console.log('pushed');

      }
      // console.log('fin');

      // return state;
    },
  }
})

export const { setSelectedContacts, } = shareSlice.actions

export default shareSlice.reducer