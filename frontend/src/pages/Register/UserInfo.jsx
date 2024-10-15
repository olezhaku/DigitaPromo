import React from "react";

import {
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";

import MyInput from "../../components/UI/Input/MyInput";

import classes from "./Register.module.css";

const UserInfo = ({ parentPhone, onChange, errors }) => {
	return (
		<Box className={classes.inputs}>
			<Box className={classes.field}>
				<MyInput
					error={Boolean(errors.surname)}
					placeholder="Фамилия"
					onChange={(event) => onChange(event, "surname")}
				/>
			</Box>
			<Box className={classes.field}>
				<MyInput
					error={Boolean(errors.name)}
					placeholder="Имя"
					onChange={(event) => onChange(event, "name")}
				/>
			</Box>
			<Box className={classes.field}>
				<MyInput
					error={Boolean(errors.patronymic)}
					placeholder="Отчество"
					onChange={(event) => onChange(event, "patronymic")}
				/>
			</Box>
			<Box className={classes.row}>
				<Box className={classes.field}>
					<MyInput
						error={Boolean(errors.date_of_birth)}
						placeholder="Дата рождения"
						onChange={(event) => onChange(event, "date_of_birth")}
					/>
				</Box>

				<Box className={classes.field}>
					<MyInput
						placeholder="Город"
						onChange={(event) => onChange(event, "city")}
					/>
				</Box>
			</Box>
			<Box className={classes.field}>
				<MyInput
					placeholder="Рекрутер"
					onChange={(event) => onChange(event, "recruitLogin")}
				/>
			</Box>
			{parentPhone && (
				<Box className={classes.field}>
					<MyInput
						error={Boolean(errors.parentPhone)}
						placeholder="Номер телефона родителя"
						onChange={(event) => onChange(event, "parentPhone")}
					/>
				</Box>
			)}
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
		</Box>
	);
};

export default UserInfo;
