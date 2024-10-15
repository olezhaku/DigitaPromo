import React, { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import { lineElementClasses, LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";

import classes from "./Statistics.module.css";

const Statistics = () => {
	// eslint-disable-next-line
	const [progressValue, setProgressValue] = useState(100);
	// const [progressStyles, setProgressStyles] = useState({});
	// const [progressGradient, setProgressGradient] = useState([
	// 	"#ffff00",
	// 	"brown",
	// ]);

	// eslint-disable-next-line
	// const [gaugeValue, setGaugeValue] = useState(10);

	// const [alignment, setAlignment] = React.useState("days");

	// const handleChange = (event, newAlignment) => {
	// 	setAlignment(newAlignment);
	// };

	// useEffect(() => {
	// 	if (progressValue === 100) {
	// 		const timer = setTimeout(() => {
	// 			setProgressStyles({
	// 				borderRadius: "50%",
	// 				boxShadow: "inset 0 0 15px 30px #4cba64",
	// 			});
	// 			setProgressGradient([]);
	// 		}, 1500);

	// 		return () => clearTimeout(timer);
	// 	}
	// }, [progressValue]);

	const pData = [2, 3, 5, 3, 8, 6, 10];
	const xLabels = [
		"Page A",
		"Page B",
		"Page C",
		"Page D",
		"Page E",
		"Page F",
		"Page G",
	];
	return (
		<Box className={classes.container}>
			<Button
				className={classes.statistics}
				variant="contained"
				color="inherit"
			>
				<Typography variant="h6" color="textSecondary">
					Личные продажи Яндекс
				</Typography>
				<Typography variant="h4">0</Typography>
			</Button>
			<ChartContainer
				className={classes.line}
				width={200}
				height={150}
				series={[
					{
						type: "line",
						data: pData,
					},
				]}
				xAxis={[{ scaleType: "point", data: xLabels }]}
				sx={{
					[`& .${lineElementClasses.root}`]: { stroke: "#90caf9" },
				}}
				disableAxisListener
			>
				<LinePlot />
			</ChartContainer>
		</Box>
	);
};

export default Statistics;
