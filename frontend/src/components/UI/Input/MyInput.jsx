import React, { useState } from "react";

import { InputAdornment } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";

import classes from "./MyInput.module.css";

const MyInput = ({ placeholder, icon, style}) => {
	// eslint-disable-next-line
	const [value, setValue] = useState("");
	const [color, setColor] = useState("inherit");

	const changeHandler = (event) => {
		setValue(event.target.value);
	};

	const handleFocus = () => {
		setColor("primary");
	};

	const handleBlur = () => {
		setColor("inherit");
	};

	// console.log(value);

	//  <icon color={color} />
	return (
		<OutlinedInput
			className={classes.input}
			placeholder={placeholder}
			endAdornment={
				<InputAdornment position="end">{icon}</InputAdornment>
			}
			onChange={changeHandler}
			onFocus={handleFocus}
			onBlur={handleBlur}
			style={style}
		/>
	);
};

export default MyInput;
