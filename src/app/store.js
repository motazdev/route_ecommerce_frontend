// import { configureStore } from '@reduxjs/toolkit';

// // import userReducer from "../features/userSlice.js";
// import authReducer from "../features/auth/authSlice.js";

// const store = configureStore({
//     reducer: {
//         user: authReducer
//     }
// });

// export default store;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import userReducer from "../features/userSlice.js";
import authReducer from "../features/auth/authSlice.js";
import { apiSlice } from './api/apiSlice.js';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;