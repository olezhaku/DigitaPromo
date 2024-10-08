import React from "react";

import Switch from "react-switch";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeSwitcher = ({ isDarkTheme, toggleTheme }) => {
	return (
		<Switch
			onChange={toggleTheme}
			checked={isDarkTheme}
			offColor={"#1976d2"}
			onColor={"#393939"}
			onHandleColor={"#1f1f1f"}
			activeBoxShadow={"0 0 2px 2px #1976d2"}
			uncheckedIcon={
				<LightModeIcon
					style={{
						marginTop: "2px",
						marginLeft: "4px",
						color: "#fbc44d",
					}}
				/>
			}
			checkedIcon={
				<DarkModeIcon
					style={{
						marginTop: "2px",
						marginLeft: "3px",
						color: "#90caf9",
					}}
				/>
			}
			id="normal-switch"
		/>
	);
};

export default ThemeSwitcher;
