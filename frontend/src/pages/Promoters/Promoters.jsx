import React, { useState } from "react";

import Filters from "../../components/Filter/Filters";
import Button from "../../components/UI/Button/MyButton";
import Input from "../../components/UI/Input/MyInput";
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
					<Button
						value="Добавить"
						icon={<AddIcon color="primary" />}
					/>

					<Button
						value="Экспорт"
						icon={<FileDownloadOutlinedIcon color="primary" />}
					/>
				</Box>

				<Box className={classes.inputs}>
					<Box className={classes.input}>
						<Input />
					</Box>

					<Box className={classes.button}>
						<Button
							isActive={isFilter}
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
