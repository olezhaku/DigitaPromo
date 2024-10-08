import React, { useState } from "react";

import { MenuItem, FormControl, Select, Typography } from "@mui/material";

import classes from "./MySelector.module.css";

const MySelector = () => {
	const [age, setAge] = useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<FormControl className={classes.container}>
			<Select
				className={classes.selector}
				value={age}
				onChange={handleChange}
				displayEmpty
				inputProps={{ "aria-label": "Without label" }}
			>
				<MenuItem value="">
					<Typography color="textDisabled">Все</Typography>
				</MenuItem>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
		</FormControl>
	);
};

export default MySelector;
