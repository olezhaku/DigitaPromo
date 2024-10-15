import { configureStore } from "@reduxjs/toolkit";
import registerReduser from "./registerSlice";

export const store = configureStore({
	reducer: { register: registerReduser },
});
