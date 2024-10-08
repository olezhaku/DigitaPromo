import React from "react";

import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

import { Avatar, Box, Paper, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WalletIcon from "../Icons/WalletIcon";

import avatar from "./../../img/avatar.jpeg";

import classes from "./Header.module.css";

const Header = ({ isDarkTheme, toggleTheme }) => {
	return (
		<Paper className={classes.header}>
			<Toolbar disableGutters className={classes.container}>
				<Box className={classes.wallet}>
					<Typography>3820</Typography>

					<WalletIcon />
				</Box>

				<ThemeSwitcher
					isDarkTheme={isDarkTheme}
					toggleTheme={toggleTheme}
				/>

				<Paper className={classes.notification} elevation={24}>
					<NotificationsIcon />
				</Paper>

				<Avatar alt="Avatar" src={avatar} />
			</Toolbar>
		</Paper>
	);
};

export default Header;
