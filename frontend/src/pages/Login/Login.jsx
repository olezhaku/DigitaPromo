import React, { useState } from "react";

import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";

import classes from "./Login.module.css";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";

const Login = () => {
	return (
		<Box className={classes.container}>
			<Box>
				<Typography className={classes.logo} variant="h3">
					Digital Promo
				</Typography>

				<Paper className={classes.modal}>
					<Typography className={classes.title} variant="h5">
						Вход
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

						<Box>
							<Box className={classes.buttons}>
								<Button variant="contained" color="primary">
									Войти
								</Button>

								<Button variant="outlined" color="primary">
									Регистрация
								</Button>
							</Box>

							<Box className={classes.rebuild}>
								<Button variant="text" color="primary">
									Восстановить пароль
								</Button>
							</Box>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};

export default Login;
