import React from "react";
import { useNavigate } from "react-router-dom";

import { Paper, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";

import MyButton from "../../components/UI/Button/MyButton";

import classes from "./Error.module.css";

const Error = () => {
	const navigate = useNavigate();

	return (
		<Paper className={classes.error}>
			<Typography variant="h1">(^-^*) </Typography>

			<MyButton
				variant="contained"
				color="primary"
				startIcon={<WestIcon />}
				style={{ padding: "0 3.5em" }}
				value="Домой"
				onClick={() => navigate("/admin/statistics")}
			/>
		</Paper>
	);
};

export default Error;
