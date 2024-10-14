import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
	Box,
	createTheme,
	Divider,
	Fade,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import MyButton from "../../components/UI/Button/MyButton";
import UserInfo from "./UserInfo";
import PassportInfo from "./PassportInfo";
import End from "../../img/End";

import classes from "./Register.module.css";

const Register = ({ isDarkTheme, toggleTheme }) => {
	//stepper
	const theme = createTheme({
		palette: {
			mode: isDarkTheme ? "dark" : "light",
		},
	});
	const colorReverse = isDarkTheme
		? theme.palette.common.black
		: theme.palette.common.white;

	const [activeStep, setActiveStep] = useState(0);
	const [animation, setAnimation] = useState(true);
	const steps = [
		{ label: "Номер телефона", description: "Подтвердите Телеграм" },
		{ label: "Введите информацию", description: "Введите данные" },
		{
			label: "Загрузить фотографии",
			description: "Загрузите фотографии паспорта",
			mini: "Они нужны для проверки",
		},
		{ label: "Паспортные данные", description: "Еще немного..." },
	];

	//inputs
	const [inputValues, setInputValues] = useState({});
	const [error, setError] = useState("");

	// eslint-disable-next-line
	const handleInputChange = (event, inputName) => {
		setInputValues({
			...inputValues,
			[inputName]: event.target.value,
		});
	};

	// eslint-disable-next-line
	function fetchRegister(data) {
		axios
			.post("http://127.0.0.1:5000/register", data)
			.then((response) => {
				console.log("Успех:", response.data);

				if (response.data) {
					// setToken(response.data.token);
				}
			})
			.catch((error) => {
				console.error("Ошибка ответа:", error.response.data);
				setError(Object.values(error.response.data));
			});
		// 	username: "exampleUser12",
		// 	password: "Password1@",
	}

	//stepper
	const handleNext = () => {
		setAnimation(false);
		setTimeout(() => {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			setAnimation(true);
		}, 300);
	};

	const handleBack = () => {
		setAnimation(false);
		setTimeout(() => {
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
			setAnimation(true);
		}, 300);
	};

	const activeStepPage = () => {
		switch (activeStep) {
			case 0:
				return <div></div>;
			case 1:
				return <UserInfo error={error} />;
			case 2:
				return <div></div>;
			case 3:
				return <PassportInfo error={error} />;
			default:
				break;
		}
	};

	//link
	const navigate = useNavigate();

	return activeStep < 4 ? (
		<Box className={classes.container}>
			<Paper
				className={classes.left__side}
				sx={{
					backgroundColor: theme.palette.primary.main,
					color: colorReverse,
				}}
			>
				<Box className={classes.logo}>
					<Typography variant="h3">Digital Promo</Typography>
				</Box>
				<Box className={classes.stepper}>
					<Typography variant="h4">Давай Начнем!</Typography>

					<Stepper
						activeStep={activeStep}
						orientation="vertical"
						sx={{
							"& .MuiStepIcon-root": {
								fontSize: "2rem",
								borderRadius: "50%",
							},
							"& .MuiStepConnector-line": { marginLeft: "3px" },
							"& .Mui-active": {
								"&.MuiStepIcon-root": {
									border: `solid ${colorReverse} 3px`,
								},
								"& .MuiStepConnector-line": {
									borderColor: colorReverse,
								},
							},
							"& .Mui-completed": {
								"&.MuiStepIcon-root": { color: colorReverse },
								"& .MuiStepConnector-line": {
									borderColor: colorReverse,
								},
							},
							"& .Mui-disabled": {
								"& .MuiStepIcon-root": {
									color: theme.palette.primary.main,
									border: `solid ${
										isDarkTheme ? "#6f6f6f" : "#b4b4b4"
									} 3px`,
								},
							},
						}}
					>
						{steps.map((step, index) => (
							<Step key={step.label}>
								<StepLabel
									sx={{
										"& .Mui-active": {
											"&.MuiStepLabel-label": {
												color: colorReverse,
											},
										},
										"& .Mui-completed": {
											"&.MuiStepLabel-label": {
												color: colorReverse,
											},
										},
										"& .MuiStepLabel-label": {
											color: colorReverse,
										},
										"& .Mui-disabled": {
											color: isDarkTheme
												? "#6f6f6f"
												: "#b4b4b4",
										},
									}}
								>
									{step.label}
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</Box>
			</Paper>

			<Paper className={classes.right__side}>
				<Box className={classes.switcher}>
					<ThemeSwitcher
						isDarkTheme={isDarkTheme}
						toggleTheme={toggleTheme}
					/>
				</Box>

				<Fade in={animation}>
					<Box className={classes.content}>
						<Box className={classes.header}>
							<Typography
								className={classes.title}
								variant="h6"
								color="primary"
							>
								ШАГ {activeStep + 1}/4
							</Typography>

							<Typography variant="h4">
								{steps[activeStep].description}
							</Typography>

							<Typography>{steps[activeStep].mini}</Typography>
						</Box>

						<Box className={classes.body}>{activeStepPage()}</Box>
					</Box>
				</Fade>

				<Box>
					<Divider />

					<Box className={classes.buttons}>
						<MyButton
							variant="contained"
							color="primary"
							value="Вперед"
							endIcon={<EastIcon />}
							style={{ padding: "0 3.5em" }}
							onClick={handleNext}
						/>

						{activeStep > 0 && (
							<MyButton
								color="inherit"
								value="Назад"
								startIcon={<WestIcon />}
								style={{ padding: "0 3.5em" }}
								onClick={handleBack}
							/>
						)}
					</Box>
				</Box>
			</Paper>
		</Box>
	) : (
		<Box className={classes.container}>
			<Paper className={classes.right__side}>
				<Box className={classes.switcher}>
					<ThemeSwitcher
						isDarkTheme={isDarkTheme}
						toggleTheme={toggleTheme}
					/>
				</Box>

				<Box className={classes.image}>
					<End isDarkTheme={isDarkTheme} />
				</Box>

				<Box className={classes.success}>
					<Typography variant="h5">
						Вы успешно зарегистрировались!
					</Typography>

					<MyButton
						variant="contained"
						color="primary"
						value="Начать"
						endIcon={<EastIcon />}
						style={{ padding: "0 3.5em" }}
						onClick={() => navigate("/admin/statistics")}
					/>
				</Box>
			</Paper>
		</Box>
	);
};

export default Register;
