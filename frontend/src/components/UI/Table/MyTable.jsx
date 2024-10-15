import React from "react";

import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";

import classes from "./MyTable.module.css";

const MyTable = () => {
	const data = [
		{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
		{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
		{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
		{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
		{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
		{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
		{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
		{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
		{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
		{ id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
		{ id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
		{ id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
		{ id: 13, lastName: "Roxie", firstName: "Harvey", age: 65 },
	];

	return (
		<Paper className={classes.container} elevation={24}>
			<TableContainer className={classes.table}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>FirstName</TableCell>
							<TableCell>LastName</TableCell>
							<TableCell>Age</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow hover key={row.id}>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.firstName}</TableCell>
								<TableCell>{row.lastName}</TableCell>
								<TableCell>{row.age}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default MyTable;
