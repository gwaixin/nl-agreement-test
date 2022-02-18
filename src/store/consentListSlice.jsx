import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    name: 'AAAA',
    lang: 'en',
    respond: true,
    record: 'path/file/test'
  }, {
    name: 'BBBB',
    lang: 'fn',
    respond: true,
    record: 'path/file/test'
  }
]

export const consentListSlice = createSlice({
  name: 'consentList',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log("the action payload", action)

      state.push(action.payload);
    },
    del: (state, action) => {
      state.splice(action.payload, 1);
    },
    reset: (state, action) => {
      state = []
    }
  }
})

export const {
  add,
  del,
  reset,
} = consentListSlice.actions;

export default consentListSlice.reducer
