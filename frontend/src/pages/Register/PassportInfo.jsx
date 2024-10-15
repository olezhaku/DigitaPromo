import React, { useState } from "react";

import { Alert, Box, Typography } from "@mui/material";
import Switch from "react-switch";

import MyInput from "../../components/UI/Input/MyInput";

import classes from "./Register.module.css";

const PassportInfo = ({ error }) => {
	const [isProcessing, setIsProcessing] = useState(false);

	return (
		<Box className={classes.inputs}>
			<Box className={classes.field}>
				<MyInput
					placeholder="Серия и номер паспорта"
					// onChange={(event) =>
					// 	handleInputChange(event, "username")
					// }
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Кем выдан"
					// onChange={(event) => handleInputChange(event, "username")}
				/>
			</Box>

			<Box className={classes.row}>
				<Box className={classes.field}>
					<MyInput
						placeholder="Дата выдачи"

						// onChange={(event) => handleInputChange(event, "password")}
					/>
				</Box>

				<Box className={classes.field}>
					<MyInput
						placeholder="Код подразделения"

						// onChange={(event) => handleInputChange(event, "password")}
					/>
				</Box>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Адрес регистрации"
					// onChange={(event) => handleInputChange(event, "username")}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Фактический адрес проживания"

					// onChange={(event) => handleInputChange(event, "password")}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="ИНН"

					// onChange={(event) => handleInputChange(event, "password")}
				/>
			</Box>

			<Box className={classes.settings}>
				<Switch
					onChange={() => setIsProcessing(!isProcessing)}
					checked={isProcessing}
					// offColor={"#1976d2"}
					// onColor={"#393939"}
					// onHandleColor={"#1f1f1f"}
					// activeBoxShadow={"0 0 2px 2px #1976d2"}
					uncheckedIcon={false}
					checkedIcon={false}
					id="normal-switch"
				/>

				<Typography color="textSecondary">
					Согласие на обработку персональных данных
				</Typography>
			</Box>

			{error && <Alert severity="error">{error}</Alert>}
		</Box>
	);
};

export default PassportInfo;
