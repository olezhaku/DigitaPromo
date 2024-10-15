import React from "react";

import { Button, Typography } from "@mui/material";

import classes from "./MyButton.module.css";

const MyButton = ({
	value,
	color,
	textColor,
	variant,
	isActive,
	onClick,
	startIcon,
	endIcon,
	style,
	icon,
}) => {
	return (
		<Button
			className={classes.button}
			style={style}
			variant={variant}
			color={isActive ? "primary" : color}
			startIcon={startIcon}
			endIcon={endIcon}
			onClick={onClick}
		>
			{icon ? icon : <Typography color={textColor}>{value}</Typography>}
		</Button>
	);
};

export default MyButton;
