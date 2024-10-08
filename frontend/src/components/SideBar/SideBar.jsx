import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { iconMap } from "../../store/tabSlice";

import NavButton from "../NavButton/NavButton";
import { Box, Paper, Typography, Divider, List } from "@mui/material";

import { Link } from "react-router-dom";
import { urlsMap } from "../../utils/urls";

import classes from "./SideBar.module.css";

const SideBar = () => {
	const navItems = useSelector((state) => state.tab.items);
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

						{Object.keys(navItem.sections).map(
							(sectionItem, section) => (
								<Link
									key={sectionItem}
									to={getUrlForSection(sectionItem)}
									style={{
										textDecoration: "none",
										color: "inherit",
									}}
								>
									<NavButton
										key={sectionItem}
										sectionItem={sectionItem}
										title={title}
										section={section}
										NavIcon={iconMap[sectionItem]}
										isWideScreen={isWideScreen}
									/>
								</Link>
							)
						)}
					</Box>
				))}
			</List>
		</Paper>
	);
};

export default SideBar;
