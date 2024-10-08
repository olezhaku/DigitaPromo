import React, { useState } from "react";

import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";

import classes from "./Login.module.css";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";

const Login = () => {
	return (
		<Box className={classes.container}>
			<Paper className={classes.modal}>
				<Typography className={classes.title} variant="h2">
					Digital <br />
					Promo
				</Typography>

				<Box className={classes.body}>
					<Box>
						<Typography>Логин</Typography>
						<MyInput
							placeholder="Введите логин"
							// style={{ background: "white" }}
						/>
					</Box>

					<Box>
						<Typography>Пароль</Typography>
						<MyInput
							placeholder="Введите пароль"
							// style={{ background: "white" }}
						/>
					</Box>

					<Box className={classes.buttons}>
						<Button variant="contained" color="primary">
							Войти
						</Button>
						<Button variant="contained" color="primary">
							Регистрация
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default Login;
