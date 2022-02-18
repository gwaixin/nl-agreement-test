import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name:    null,
  lang:    null,
  respond: null,
  record:  null
}

export const consentSlice = createSlice({
  name: 'consent',
  initialState,
  reducers: {

    updateForm: (state, action) => {
      const { name, lang } = action.payload
      state.name = name
      state.lang = lang
    },

    updateRespond: (state, action) => {
      state.respond = action.payload
    },

    updateRecord: (state, action) => {
      state.record = action.payload
    },

    update: (state, action) => {
      state = action.payload
    },

    reset: () => {
      return {...initialState}
    }
  },
});


export const {
  updateForm,
  updateRespond,
  updateRecord,
  update,
  reset
} = consentSlice.actions;

export default consentSlice.reducer