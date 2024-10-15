import React from "react";

import { Box, Paper, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import MyButton from "../../components/UI/Button/MyButton";
import End from "../img/End";

import classes from "./Register.module.css";

const TneEnd = ({ isDarkTheme, toggleTheme }) => {
	return (
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

						// onClick={}
					/>
				</Box>
			</Paper>
		</Box>
	);
};

export default TneEnd;
