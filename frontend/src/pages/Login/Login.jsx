import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Checkbox, Paper, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";

import classes from "./Login.module.css";
import { fetchAuth } from "../../utils/fetchData";

const Login = ({ isDarkTheme, toggleTheme }) => {
	const [inputValues, setInputValues] = useState({
		username: "",
		password: "",
		token: "",
		code: "",
	});
	const [send, setSend] = useState({
		username: "",
		password: "",
	});
	// eslint-disable-next-line
	const [token, setToken] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleInputChange = (event, inputName) => {
		setInputValues({
			...inputValues,
			[inputName]: event.target.value,
		});
	};

	useEffect(() => {
		console.log(send);
		fetchAuth("login", send);
	}, [send]);

	// 	username: STruAS,
	// 	password: Password@123,

	return (
		<Paper className={classes.background}>
			<Box className={classes.logo}>
				<Typography variant="h3">Digital Promo</Typography>
				<ThemeSwitcher
					isDarkTheme={isDarkTheme}
					toggleTheme={toggleTheme}
				/>
			</Box>

			<Box className={classes.body}>
				<Typography
					className={classes.title}
					variant="h4"
					color={isDarkTheme && "primary"}
				>
					Вход
				</Typography>

				<Box className={classes.inputs}>
					<Box className={classes.field}>
						<Typography color="textSecondary">Логин</Typography>

						<MyInput
							placeholder="Введите логин"
							onChange={(event) =>
								handleInputChange(event, "username")
							}
						/>
					</Box>

					<Box className={classes.field}>
						<Typography color="textSecondary">Пароль</Typography>

						<MyInput
							variant="password"
							placeholder="Введите пароль"
							onChange={(event) =>
								handleInputChange(event, "password")
							}
						/>
					</Box>
					{error && <Alert severity="error">{error}</Alert>}

					<Box className={classes.settings}>
						<Box className={classes.checkbox}>
							<Checkbox defaultChecked />
							<Typography color="textSecondary">
								Запомнить меня
							</Typography>
						</Box>

						<Typography color="textSecondary">
							Восстановить
						</Typography>
					</Box>

					<Box>
						<Box className={classes.buttons}>
							<MyButton
								variant="contained"
								color="primary"
								value="Войти"
								endIcon={<EastIcon />}
								style={{ padding: "0 3.5em" }}
								onClick={() => setSend(inputValues)}
							/>

							<MyButton
								variant="text"
								color="primary"
								value="Регистрация"
								onClick={() => navigate("/register")}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
};

export default Login;
