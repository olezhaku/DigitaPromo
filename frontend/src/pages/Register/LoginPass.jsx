import React from "react";

import { Box } from "@mui/material";

import MyInput from "../../components/UI/Input/MyInput";

import classes from "./Register.module.css";

const LoginPass = ({ onChange, errors }) => {
	return (
		<Box className={classes.inputs}>
			<Box className={classes.field}>
				<MyInput
					error={Boolean(errors.username)}
					placeholder="Придумайте логин"
					onChange={(event) => onChange(event, "username")}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					error={Boolean(errors.password0)}
					placeholder="Придумайте пароль"
					variant="password"
					onChange={(event) => onChange(event, "password0")}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					error={Boolean(errors.password)}
					placeholder="Повторите пароль"
					variant="password"
					onChange={(event) => onChange(event, "password")}
				/>
			</Box>
		</Box>
	);
};

export default LoginPass;
