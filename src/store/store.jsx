import { configureStore } from '@reduxjs/toolkit'

import consentReducer from './consentSlice';
// import consentAction from './consentSlice';
import consentListReducer from './consentListSlice';



const consentMiddleware = (store) => (next) => (action) => {

  const result = next(action);
  console.log("action.type :", action.type);

  if ( action.type?.startsWith('consentList/add') ) {
    let consents = store.getState().consentList;
    localStorage.setItem('consents', JSON.stringify(consents))
  }

  return result;

};

const reHydrateStore = () => {
  if (localStorage.getItem('consents') !== null) {
    return { consentList: JSON.parse(localStorage.getItem('consents')) };
  }
};


export const store = configureStore({
  reducer: {
    consent: consentReducer,
    consentList: consentListReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(consentMiddleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch