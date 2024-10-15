import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	values: {
		username: "",
		password: "",
		name: "",
		surname: "",
		patronymic: "",
		date_of_birth: "",
		passportPhoto1Url: "http://digitalporno.ru",
		passportPhoto2Url: "http://digitalporno.ru",
		parentPhone: "",
		recruitLogin: "",
		city: "",
		passportData: {
			passportNumber: "",
			issuedBy: "",
			issueDate: "",
			divisionCode: "",
			registrationAddress: "",
			residenceAddress: "",
			inn: "",
		},
	},
	errors: {
		username: false,
		password: false,
		name: false,
		surname: false,
		patronymic: false,
		date_of_birth: false,
		// passportPhoto1Url: false,
		// passportPhoto2Url: "",
		parentPhone: false,
		// recruitLogin: false,
		// city: false,
	},

	passportErrors: {
		passportNumber: false,
		issuedBy: false,
		issueDate: false,
		divisionCode: false,
		registrationAddress: false,
		residenceAddress: false,
		inn: false,
	},
};

export const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		changeUserInfoHandler(state, action) {
			const { field, value, passport } = action.payload;
			if (passport) {
				state.values.passportData[field] = value;
				state.passportErrors[field] = false;
			} else {
				state.values[field] = value;
				state.errors[field] = false;
			}
		},
		setError(state, action) {
			const { field, error, passport } = action.payload;

			if (passport) {
				state.passportErrors[field] = error;
			} else {
				state.errors[field] = error;
			}
		},
	},
});

export const { changeUserInfoHandler, setError, setPassportError } =
	registerSlice.actions;

export default registerSlice.reducer;
