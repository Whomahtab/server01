import themeSlice from "./Theme/themeSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/Authentication.js"


const store = configureStore({
    reducer: {
        theme: themeSlice,
        Auth: authSlice,
    },
});


export default store;
