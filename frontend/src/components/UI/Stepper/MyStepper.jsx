import React from "react";

import { Step, StepLabel, Stepper } from "@mui/material";

import { steps } from "../../../utils/stepper";

const MyStepper = ({ activeStep, colorReverse, theme, isDarkTheme }) => {
	return (
		<Stepper
			activeStep={activeStep}
			orientation="vertical"
			sx={{
				"& .MuiStepIcon-root": {
					fontSize: "2rem",
					borderRadius: "50%",
				},
				"& .MuiStepConnector-line": { marginLeft: "3px" },
				"& .Mui-active": {
					"&.MuiStepIcon-root": {
						border: `solid ${colorReverse} 3px`,
					},
					"& .MuiStepConnector-line": {
						borderColor: colorReverse,
					},
				},
				"& .Mui-completed": {
					"&.MuiStepIcon-root": { color: colorReverse },
					"& .MuiStepConnector-line": {
						borderColor: colorReverse,
					},
				},
				"& .Mui-disabled": {
					"& .MuiStepIcon-root": {
						color: theme.palette.primary.main,
						border: `solid ${
							isDarkTheme ? "#6f6f6f" : "#b4b4b4"
						} 3px`,
					},
				},
			}}
		>
			{steps.map((step, index) => (
				<Step key={step.label}>
					<StepLabel
						sx={{
							"& .Mui-active": {
								"&.MuiStepLabel-label": {
									color: colorReverse,
								},
							},
							"& .Mui-completed": {
								"&.MuiStepLabel-label": {
									color: colorReverse,
								},
							},
							"& .MuiStepLabel-label": {
								color: colorReverse,
							},
							"& .Mui-disabled": {
								color: isDarkTheme ? "#6f6f6f" : "#b4b4b4",
							},
						}}
					>
						{step.label}
					</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export default MyStepper;
