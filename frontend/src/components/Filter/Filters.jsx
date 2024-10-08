import React from "react";

import DateSelector from "../UI/DateSelector/MyDateSelector";
import Selector from "../UI/Selector/MySelector";
import MyButton from "../UI/Button/MyButton";

import { Box, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./Filters.module.css";

const Filters = () => {
	return (
		<Paper className={classes.filters} elevation={24}>
			<Box className={classes.container}>
				<Box className={classes.item}>
					<Typography>Дата</Typography>
					<DateSelector />
				</Box>

				<Box className={classes.item}>
					<Typography>Город</Typography>
					<Selector />
				</Box>

				<Box className={classes.item}>
					<Typography>Паспорт проверен</Typography>
					<Selector />
				</Box>

				<Box className={classes.item}>
					<Typography>Состояние</Typography>
					<Selector />
				</Box>
			</Box>

			<Box className={classes.container}>
				<Box className={classes.item}>
					<Typography>Роль</Typography>
					<Selector />
				</Box>

				<Box className={classes.item}>
					<Typography>Рекрутер</Typography>
					<Selector />
				</Box>

				<Box className={classes.item}>
					<Typography>Приглашен пользователем</Typography>
					<Selector />
				</Box>

				<Box className={classes.item}>
					<Typography>Договор подписан</Typography>
					<Selector />
				</Box>
			</Box>

			<Box className={classes.remove}>
				<MyButton
					value="Сбросить"
					icon={<CloseIcon color="primary" />}
				/>
			</Box>
		</Paper>
	);
};

export default Filters;
