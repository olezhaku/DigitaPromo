import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { urlsMap } from "../../utils/urls";

import { Button, IconButton, Typography } from "@mui/material";

import classes from "./NavButton.module.css";

const NavButton = ({ sectionItem, NavIcon, isWideScreen }) => {
	const location = useLocation();
	const currentUrl = location.pathname.split("/")[2];
	const activeTab = Object.entries(urlsMap).find(
		([key, value]) => value === currentUrl
	)?.[0];
	const [isActive, setIsActive] = useState(activeTab);

	const handleSectionClick = (sectionItem) => {
		setIsActive(sectionItem);
	};

	// eslint-disable-next-line
	useEffect(() => setIsActive(activeTab), [currentUrl]);

	return isWideScreen ? (
		<Button
			className={classes.navbutton}
			onClick={() => handleSectionClick(sectionItem)}
			variant={sectionItem === isActive ? "contained" : "text"}
			color={sectionItem === isActive ? "primary" : "inherit"}
			startIcon={NavIcon && <NavIcon />}
		>
			<Typography>{sectionItem}</Typography>
		</Button>
	) : (
		<IconButton
			className={classes.iconbutton}
			onClick={() => handleSectionClick(sectionItem)}
			color={sectionItem === isActive ? "primary" : "inherit"}
		>
			{NavIcon && <NavIcon />}
		</IconButton>
	);
};

export default NavButton;
