import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
import themeSlice from './themeSlice';



const store = configureStore({
    reducer: {
       auth: authSlice,
       theme: themeSlice
    },
    middleware: (getDefaultMiddleware) =>
    {
      return getDefaultMiddleware({
       serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates', 'firebase', 'firestore'],
      },
    })
},
});

export default store;