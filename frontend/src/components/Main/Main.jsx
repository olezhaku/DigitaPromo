import React from "react";

import { Box, Container } from "@mui/material";

import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import Content from "../Content/Content";

import classes from "./Main.module.css";

const Main = ({ toggleTheme, isDarkTheme }) => {
	return (
		<Container maxWidth="x1" className={classes.container}>
			<Box>
				<SideBar />
			</Box>

			<Box className={classes.content}>
				<Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />

				<Content />
			</Box>
		</Container>
	);
};

export default Main;
