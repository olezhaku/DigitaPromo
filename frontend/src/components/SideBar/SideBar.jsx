import React, { useEffect, useState } from "react";
import { navItems, iconMap } from "../../utils/tabNames";
import { Link } from "react-router-dom";
import { urlsMap } from "../../utils/urls";

import NavButton from "../NavButton/NavButton";
import { Box, Paper, Typography, Divider, List } from "@mui/material";

import classes from "./SideBar.module.css";

const SideBar = () => {
	const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1080);

	const handleResize = () => {
		setIsWideScreen(window.innerWidth > 1080);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const getUrlForSection = (sectionKey) => {
		return urlsMap[sectionKey] || "#";
	};

	return (
		<Paper className={classes.nav}>
			{isWideScreen ? (
				<>
					<Box className={classes.logo}>
						<Typography variant="h4">Digital Promo</Typography>
					</Box>

					<Divider />
				</>
			) : (
				<Box className={classes.minilogo}>
					<Typography variant="h4">DP</Typography>
				</Box>
			)}

			<List className={classes.navlist}>
				{navItems.map((navItem, title) => (
					<Box key={navItem.title} className={classes.navitem}>
						{isWideScreen ? (
							<Typography color="textDisabled">
								{navItem.title}
							</Typography>
						) : (
							<Typography color="textDisabled">
								<Divider />
							</Typography>
						)}

						{navItem.sections.map((section, index) => (
							<Link
								key={index}
								to={getUrlForSection(section)}
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								<NavButton
									sectionItem={section}
									NavIcon={iconMap[section]}
									isWideScreen={isWideScreen}
								/>
							</Link>
						))}
					</Box>
				))}
			</List>
		</Paper>
	);
};

export default SideBar;
