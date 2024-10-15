import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import Switch from "react-switch";

import MyInput from "../../components/UI/Input/MyInput";

import classes from "./Register.module.css";

const PassportInfo = ({ errors, onChange }) => {
	const [isProcessing, setIsProcessing] = useState(false);

	return (
		<Box className={classes.inputs}>
			<Box className={classes.field}>
				<MyInput
					placeholder="Серия и номер паспорта"
					error={Boolean(errors.passportNumber)}
					onChange={(event) =>
						onChange(event, "passportNumber", true)
					}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Кем выдан"
					error={Boolean(errors.issuedBy)}
					onChange={(event) => onChange(event, "issuedBy", true)}
				/>
			</Box>

			<Box className={classes.row}>
				<Box className={classes.field}>
					<MyInput
						placeholder="Дата выдачи"
						error={Boolean(errors.issueDate)}
						onChange={(event) => onChange(event, "issueDate", true)}
					/>
				</Box>

				<Box className={classes.field}>
					<MyInput
						placeholder="Код подразделения"
						error={Boolean(errors.divisionCode)}
						onChange={(event) =>
							onChange(event, "divisionCode", true)
						}
					/>
				</Box>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Адрес регистрации"
					error={Boolean(errors.registrationAddress)}
					onChange={(event) =>
						onChange(event, "registrationAddress", true)
					}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="Фактический адрес проживания"
					error={Boolean(errors.residenceAddress)}
					onChange={(event) =>
						onChange(event, "residenceAddress", true)
					}
				/>
			</Box>

			<Box className={classes.field}>
				<MyInput
					placeholder="ИНН"
					error={Boolean(errors.inn)}
					onChange={(event) => onChange(event, "inn", true)}
				/>
			</Box>

			<Box className={classes.settings}>
				<Switch
					onChange={() => setIsProcessing(!isProcessing)}
					checked={isProcessing}
					uncheckedIcon={false}
					checkedIcon={false}
					id="normal-switch"
				/>

				<Typography color="textSecondary">
					Согласие на обработку персональных данных
				</Typography>
			</Box>
		</Box>
	);
};

export default PassportInfo;
