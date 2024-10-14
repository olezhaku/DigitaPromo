import React, { useEffect, useState } from "react";

import Main from "./components/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Error from "./pages/Error/Error";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/App.css";

function App() {
	const [isDarkTheme, setIsDarkTheme] = useState(
		() => localStorage.getItem("theme") === "true"
	);

	useEffect(() => {
		localStorage.setItem("theme", isDarkTheme);
		document.body.classList.toggle("dark", isDarkTheme);
	}, [isDarkTheme]);

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	const theme = createTheme({
		palette: {
			mode: isDarkTheme ? "dark" : "light",
		},
	});

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<div className={`App ${isDarkTheme ? "dark" : "light"}`}>
					<Routes>
						<Route
							path="/login"
							element={
								<Login
									isDarkTheme={isDarkTheme}
									toggleTheme={toggleTheme}
								/>
							}
						/>
						<Route
							path="/register"
							element={
								<Register
									isDarkTheme={isDarkTheme}
									toggleTheme={toggleTheme}
								/>
							}
						/>
						<Route
							path="/admin/*"
							element={
								<Main
									toggleTheme={toggleTheme}
									isDarkTheme={isDarkTheme}
								/>
							}
						/>

						<Route path={"*" || "/error"} element={<Error />} />
					</Routes>
				</div>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
