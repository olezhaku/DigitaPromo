import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../store/tabSlice";

import { Button, IconButton, Typography } from "@mui/material";

import classes from "./NavButton.module.css";

const NavButton = ({ sectionItem, title, section, NavIcon, isWideScreen }) => {
	const active = useSelector((state) => state.tab.active);
	const dispatch = useDispatch();

	const handleSectionClick = (title, section) => {
		dispatch(setActive({ title, section }));
	};

	return (
		<>
			{isWideScreen ? (
				<Button
					className={classes.navbutton}
					onClick={() => handleSectionClick(title, section)}
					variant={
						active.title === title && active.section === section
							? "contained"
							: "text"
					}
					color={
						active.title === title && active.section === section
							? "primary"
							: "inherit"
					}
					startIcon={NavIcon && <NavIcon />}
				>
					<Typography>{sectionItem}</Typography>
				</Button>
			) : (
				<IconButton
					className={classes.iconbutton}
					onClick={() => handleSectionClick(title, section)}
					color={
						active.title === title && active.section === section
							? "primary"
							: "inherit"
					}
				>
					{NavIcon && <NavIcon />}
				</IconButton>
			)}
		</>
	);
};

export default NavButton;
