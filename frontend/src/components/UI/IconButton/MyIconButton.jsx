import React from "react";

import { IconButton, Paper } from "@mui/material";

import classes from "./MyIconButton.module.css";

const MyIconButton = ({ icon }) => {
	return (
		<Paper className={classes.border}>
			<Paper className={classes.icon} elevation={24}>
				<IconButton>{icon}</IconButton>
			</Paper>
		</Paper>
	);
};

export default MyIconButton;
