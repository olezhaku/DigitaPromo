import React from "react";

import { Button, Typography } from "@mui/material";

import classes from "./MyButton.module.css";

const MyButton = ({ value, icon, onClick, style, isActive, color }) => {
	return (
		<Button
			className={classes.button}
			style={style}
			variant="contained"
			color={isActive ? "primary" : "inherit"}
			startIcon={icon}
			onClick={onClick}
		>
			<Typography color={isActive ? "" : "primary"}>{value}</Typography>
		</Button>
	);
};

export default MyButton;
