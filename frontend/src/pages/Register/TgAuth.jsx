import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import classes from "./Register.module.css";

const TgAuth = ({ LinkAuth }) => {
	return (
		<Box className={classes.inputs}>
			<Typography variant="h4">Вы успешно зарегистрировались</Typography>
			<Typography>
				Перейдите по ссылке для подтверждения аккаунта:
			</Typography>
			<Link to={LinkAuth}>{LinkAuth}</Link>
		</Box>
	);
};

export default TgAuth;
