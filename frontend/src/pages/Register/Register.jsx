import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeUserInfoHandler, setError } from "../../store/registerSlice";
import { ageValidation, inputValidation } from "../../utils/inputValidation";
import { fetchAuth } from "../../utils/fetchData";
import { steps } from "../../utils/stepper";

import {
	Alert,
	Box,
	createTheme,
	Divider,
	Fade,
	Paper,
	Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import MyButton from "../../components/UI/Button/MyButton";
import MyStepper from "../../components/UI/Stepper/MyStepper";

import LoginPass from "./LoginPass";
import UserInfo from "./UserInfo";
import UploadFoto from "./UploadFoto";
import PassportInfo from "./PassportInfo";
import TgAuth from "./TgAuth";
import TheEnd from "./TneEnd";

import classes from "./Register.module.css";

const Register = ({ isDarkTheme, toggleTheme }) => {
	//states
	const dispatch = useDispatch();
	const { values, errors, passportErrors } = useSelector(
		(state) => state.register
	);
	const [LinkAuth, setLinkAuth] = useState("");

	//theme
	const theme = createTheme({
		palette: {
			mode: isDarkTheme ? "dark" : "light",
		},
	});
	const colorReverse = isDarkTheme
		? theme.palette.common.black
		: theme.palette.common.white;

	//steps
	const [activeStep, setActiveStep] = useState(0);
	const [animation, setAnimation] = useState(true);

	//errors
	const [allFields, setAllFields] = useState("");
	const error = Object.values(errors).filter((error) => error !== false)[0];
	const passportError = Object.values(passportErrors).filter(
		(error) => error !== false
	)[0];

	useEffect(() => {
		setAllFields("");
		if (activeStep === 4) {
			fetchAuth("register", values, setLinkAuth);
			console.log(values);
		}
	}, [passportError, error, activeStep]);

	//input
	const handleInputChange = (event, field, passport) => {
		let value = event.target.value;

		const validationResult = inputValidation(
			field,
			value,
			values.password0
		);

		if (passport) {
			if (validationResult === true) {
				dispatch(changeUserInfoHandler({ field, value, passport }));
			} else {
				dispatch(
					setError({ field, error: validationResult, passport })
				);
			}
		} else {
			if (validationResult === true) {
				dispatch(changeUserInfoHandler({ field, value }));
			} else if (field === "recruitLogin" || field === "city") {
				dispatch(changeUserInfoHandler({ field, value }));
			} else {
				dispatch(setError({ field, error: validationResult }));
			}
		}
	};

	//steps
	const activeStepPage = () => {
		switch (activeStep) {
			case 0:
				return (
					<LoginPass onChange={handleInputChange} errors={errors} />
				);
			case 1:
				return (
					<UserInfo
						onChange={handleInputChange}
						parentPhone={ageValidation(values.date_of_birth)}
						errors={errors}
					/>
				);
			case 2:
				return <UploadFoto />;
			case 3:
				return (
					<PassportInfo
						errors={passportErrors}
						onChange={handleInputChange}
					/>
				);
			case 4:
				return <TgAuth LinkAuth={LinkAuth} />;
			default:
				break;
		}
	};

	const handleNext = () => {
		if (activeStep === 0) {
			if (values.username && values.password0 && values.password) {
				if (!error) {
					setAnimation(false);
					setTimeout(() => {
						setActiveStep((prevActiveStep) => prevActiveStep + 1);
						setAnimation(true);
					}, 300);
				}
			} else {
				setAllFields("Все поля обязательны");
			}
		} else if (activeStep === 1) {
			if (
				values.name &&
				values.surname &&
				values.date_of_birth &&
				values.city
			) {
				if (!error) {
					setAnimation(false);
					setTimeout(() => {
						setActiveStep((prevActiveStep) => prevActiveStep + 1);
						setAnimation(true);
					}, 300);
				}
			} else {
				setAllFields("Все поля обязательны");
			}
		} else if (activeStep === 3) {
			if (
				values.passportData.passportNumber &&
				values.passportData.issuedBy &&
				values.passportData.issueDate &&
				values.passportData.divisionCode &&
				values.passportData.registrationAddress &&
				values.passportData.residenceAddress &&
				values.passportData.inn
			) {
				if (!passportError) {
					setAnimation(false);
					setTimeout(() => {
						setActiveStep((prevActiveStep) => prevActiveStep + 1);
						setAnimation(true);
					}, 300);
				}
			} else {
				setAllFields("Все поля обязательны");
			}
		} else if (activeStep === 2) {
			setAnimation(false);
			setTimeout(() => {
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
				setAnimation(true);
			}, 300);
		}
	};

	const handleBack = () => {
		setAnimation(false);
		setTimeout(() => {
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
			setAnimation(true);
		}, 300);
	};

	//link
	// const navigate = useNavigate();

	return activeStep < 5 ? (
		<Box className={classes.container}>
			<Paper
				className={classes.left__side}
				sx={{
					backgroundColor: theme.palette.primary.main,
					color: colorReverse,
				}}
			>
				<Box className={classes.logo}>
					<Typography variant="h3">Offer Project</Typography>
				</Box>

				<Box className={classes.stepper}>
					<Typography variant="h4">Давай Начнем!</Typography>

					<MyStepper
						activeStep={activeStep}
						theme={theme}
						colorReverse={colorReverse}
						isDarkTheme={isDarkTheme}
					/>
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

						<Box className={classes.body}>
							{activeStepPage()}

							<Fade
								in={Boolean(
									allFields || error || passportError
								)}
							>
								<Box sx={{ height: "6em" }}>
									{(allFields || error || passportError) && (
										<Alert severity="error">
											{allFields ||
												error ||
												passportError}
										</Alert>
									)}
								</Box>
							</Fade>
						</Box>
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
		<TheEnd />
	);
};

export default Register;
