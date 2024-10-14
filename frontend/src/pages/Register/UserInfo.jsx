import React from "react";

import {
	Alert,
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";

import MyInput from "../../components/UI/Input/MyInput";

import classes from "./Register.module.css";

const UserInfo = ({ error }) => {
	return (
		<Box className={classes.inputs}>
			<Box className={classes.field}>
				<MyInput
					placeholder="Фамилия"
					// onChange={(event) =>
					// 	handleInputChange(event, "username")
					// }
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Имя"
					// onChange={(event) => handleInputChange(event, "username")}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Отчество"
					// onChange={(event) => handleInputChange(event, "username")}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Телеграм@"

					// onChange={(event) => handleInputChange(event, "password")}
				/>
			</Box>

			<Box className={classes.row}>
				<Box className={classes.field}>
					<MyInput
						placeholder="Дата рождения"

						// onChange={(event) => handleInputChange(event, "password")}
					/>
				</Box>

				<Box className={classes.field}>
					<MyInput
						placeholder="Город"

						// onChange={(event) => handleInputChange(event, "password")}
					/>
				</Box>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Рекрутер"

					// onChange={(event) => handleInputChange(event, "password")}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Номер телефона родителя"

					// onChange={(event) => handleInputChange(event, "password")}
				/>
			</Box>

			<RadioGroup row className={classes.settings}>
				<Typography color="textSecondary">
					Работал(а) в сфере продаж
				</Typography>

				<Box>
					<FormControlLabel
						value="yes"
						control={<Radio />}
						label="Да"
					/>

					<FormControlLabel
						value="no"
						control={<Radio />}
						label="Нет"
					/>
				</Box>
			</RadioGroup>

			{error && <Alert severity="error">{error}</Alert>}
		</Box>
	);
};

export default UserInfo;
