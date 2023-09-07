import { configureStore } from "@reduxjs/toolkit";
import candAuthReducer from "./slices/candAuthSlice";

const rootReducer = {
    candAuth: candAuthReducer
}
const store = configureStore({
    reducer: rootReducer,
});

export default store;