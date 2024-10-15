import React, { useState } from "react";

import Filters from "../../components/Filter/Filters";
import MyButton from "../../components/UI/Button/MyButton";
import MyInput from "../../components/UI/Input/MyInput";
import MyTable from "../../components/UI/Table/MyTable";

import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";

import classes from "./Promoters.module.css";

const Promoters = () => {
	const [isFilter, setIsFilter] = useState(false);

	return (
		<Box className={classes.promoters}>
			<Box className={classes.filter}>
				<Box className={classes.buttons}>
					<MyButton
						value="Добавить"
						color="inherit"
						textColor="primary"
						variant="contained"
						startIcon={<AddIcon color="primary" />}
					/>

					<MyButton
						value="Экспорт"
						color="inherit"
						textColor="primary"
						variant="contained"
						startIcon={<FileDownloadOutlinedIcon color="primary" />}
					/>
				</Box>

				<Box className={classes.inputs}>
					<Box className={classes.input}>
						<MyInput variant="search" />
					</Box>

					<Box className={classes.button}>
						<MyButton
							isActive={isFilter}
							color="inherit"
							variant="contained"
							icon={
								<FilterListIcon
									color={isFilter ? "inherit" : "primary"}
								/>
							}
							onClick={() => setIsFilter(!isFilter)}
						/>
					</Box>
				</Box>
			</Box>

			<Box
				className={`${classes.filtersContainer} ${
					isFilter ? classes.active__filter : classes.hidden__filter
				}`}
			>
				<Filters />
			</Box>

			<MyTable />
		</Box>
	);
};

export default Promoters;
