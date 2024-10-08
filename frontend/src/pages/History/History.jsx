import React from "react";

import MyButton from "../../components/UI/Button/MyButton";

import {
	Badge,
	Box,
	Container,
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";

import Browser from "../../components/Icons/Browser";
import Money from "../../components/Icons/Money";
import Mts from "../../components/Icons/Mts";

import classes from "./History.module.css";

const History = () => {
	return (
		<Box className={classes.statistics}>
			<Box className={classes.nav}>
				<MyButton value="Все" />

				<MyButton value="Начисления" />

				<MyButton value="Вычеты" />
			</Box>

			<Paper className={classes.history} elevation={24}>
				<Container className={classes.container} maxWidth="x1">
					<Box className={classes.transfers}>
						<Box>
							<Typography>
								<Badge color="success" variant="dot" />
								Начислено
							</Typography>

							<Typography variant="h4">123456₽ </Typography>
						</Box>

						<Box>
							<Typography>
								<Badge color="warning" variant="dot" />
								Вычтено
							</Typography>

							<Typography variant="h4">-112233₽</Typography>
						</Box>
					</Box>

					<Box className={classes.graphics}>
						<Box className={classes.month}>
							<Box className={classes.lines}>
								<LinearProgress
									className={classes.progress}
									variant="determinate"
									value={60}
									color="success"
								/>

								<LinearProgress
									className={classes.progress}
									variant="determinate"
									value={50}
									color="warning"
								/>
							</Box>

							<Box className={classes.description}>Все</Box>
						</Box>

						<Box className={classes.month}>
							<Box className={classes.lines}>
								<LinearProgress
									className={classes.progress}
									variant="determinate"
									value={60}
									color="success"
								/>

								<LinearProgress
									className={classes.progress}
									variant="determinate"
									value={30}
									color="warning"
								/>
							</Box>

							<Box className={classes.description}>Сен 24</Box>
						</Box>

						<Box className={classes.month}>
							<Box className={classes.lines}>
								<LinearProgress
									className={classes.progress}
									variant="determinate"
									value={90}
									color="success"
								/>

								<LinearProgress
									className={classes.progress}
									variant="determinate"
									value={10}
									color="warning"
								/>
							</Box>

							<Box className={classes.description}>Авг 24</Box>
						</Box>
					</Box>
				</Container>
			</Paper>

			<TableContainer>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">
								<Box
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
									}}
								>
									<Browser />
									Браузеры
								</Box>
							</TableCell>
							<TableCell align="right">123₽</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Box
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
									}}
								>
									<Money />
									Премии
								</Box>
							</TableCell>
							<TableCell align="right">123₽</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Box
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
									}}
								>
									<Mts />
									МТС
								</Box>
							</TableCell>
							<TableCell align="right">123₽</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default History;
