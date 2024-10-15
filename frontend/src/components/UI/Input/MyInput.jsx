import React, { useState } from "react";

import { IconButton, OutlinedInput } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/SearchOutlined";

import classes from "./MyInput.module.css";

const MyInput = ({ placeholder, Icon, style, variant, onChange }) => {
	const [color, setColor] = useState("inherit");
	const [showPassword, setShowPassword] = useState(false);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event) => {
		event.preventDefault();
	};

	const iconFromInput = () => {
		switch (variant) {
			case "password":
				return (
					<IconButton
						onClick={() => setShowPassword(!showPassword)}
						onMouseDown={handleMouseDownPassword}
						onMouseUp={handleMouseUpPassword}
						edge="end"
					>
						{showPassword ? <Visibility /> : <VisibilityOff />}
					</IconButton>
				);

			case "search":
				return (
					<IconButton edge="end">
						<SearchIcon color={color} />
					</IconButton>
				);
			default:
				break;
		}
	};

	return (
		<OutlinedInput
			className={classes.input}
			placeholder={placeholder}
			endAdornment={iconFromInput()}
			onChange={onChange}
			onFocus={() => setColor("primary")}
			onBlur={() => setColor("inherit")}
			style={style}
			type={
				variant !== "password"
					? "text"
					: showPassword
					? "text"
					: "password"
			}
		/>
	);
};

export default MyInput;
