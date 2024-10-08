import React from "react";

import { Box, Paper, Typography } from "@mui/material";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import GaugeComponent from "react-gauge-component";

import classes from "./CircleProgress.module.css";

const CircleProgress = ({ value }) => {
	const props = {
		id: "motivation",
		percent: 100,
		animationOff: true,
		round: true,
		rotation: 180,
		number: false,
		cut: 50,
		size: 250,
		linearGradient: ["#55b01b", "#bfae1e", "orange", "#ff8705", "#ed0644"],
	};

	return (
		<Box className={classes.container}>
			<Box>
				<Box height={150}>
					<CircularProgressBar {...props}></CircularProgressBar>
				</Box>

				<Paper elevation={2} className={classes.border}>
					<Paper elevation={24} className={classes.circle}>
						<Typography variant="h4">{value}</Typography>
					</Paper>
				</Paper>
			</Box>

			<Box className={classes.numbers}>
				<Typography className={classes.zero}>0</Typography>
				<Typography className={classes.five}>5</Typography>
				<Typography className={classes.ten}>10</Typography>
				<Typography className={classes.fiveteen}>15</Typography>
				<Typography className={classes.twenty}>20+</Typography>
			</Box>

			<GaugeComponent
				type="semicircle"
				className={classes.gauge}
				value={value}
				maxValue={20}
				arc={{
					width: 0.5,
					colorArray: ["rgba(0, 0, 0, 0)"],
					subArcs: [
						{ limit: 5 },
						{ limit: 10 },
						{ limit: 15 },
						{ limit: 20 },
					],
				}}
				pointer={{
					type: "arrow",
					color: "#04c129",
					animationDelay: 0,
					width: 15,
				}}
				labels={{
					valueLabel: {
						style: {
							fontSize: 0,
						},
					},
					tickLabels: {
						type: "inner",
						hideMinMax: true,
					},
				}}
			/>
		</Box>
	);
};

export default CircleProgress;
