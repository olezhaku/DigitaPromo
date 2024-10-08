import React, { useState } from "react";

import Button from "@mui/material/Button";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import useForkRef from "@mui/utils/useForkRef";

import dayjs from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import classes from "./MyDateSelector.module.css";

import { LicenseInfo } from "@mui/x-data-grid-pro";

LicenseInfo.setLicenseKey(
	"e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
);

dayjs.extend(customParseFormat);
dayjs.locale("ru");

const MyDateSelector = () => {
	const [value, setValue] = useState([null, null]);
	const [open, setOpen] = useState(false);

	const label =
		value[0] && value[1]
			? `${value[0].format("DD.MM.YYYY")} - ${value[1].format(
					"DD.MM.YYYY"
			  )}`
			: "Выберите период";

	const DateRangeButtonField = React.forwardRef((props, ref) => {
		const {
			setOpen,
			InputProps: { ref: containerRef } = {},
			inputProps: { "aria-label": ariaLabel } = {},
		} = props;

		const handleRef = useForkRef(ref, containerRef);

		return (
			<Button
				className={classes.button}
				variant="outlined"
				color="inherit"
				endIcon={<CalendarMonthIcon />}
				ref={handleRef}
				aria-label={ariaLabel}
				onClick={() => setOpen((prev) => !prev)}
			>
				{label}
			</Button>
		);
	});

	DateRangeButtonField.fieldType = "single-input";

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
			<DateRangePicker
				slots={{ field: DateRangeButtonField }}
				slotProps={{ field: { setOpen } }}
				PopperProps={{ disablePortal: true, placement: "bottom-start" }}
				open={open}
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				value={value}
				onChange={setValue}
			/>
		</LocalizationProvider>
	);
};

export default MyDateSelector;
