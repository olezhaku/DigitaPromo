import React, { useState } from "react";

import Background from "./components/UI/Background/Background";
import Main from "./components/Main/Main";
import Login from "./pages/Login/Login";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/App.css";

function App() {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

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
						<Route path="/login" element={<Login />} />

						<Route
							path="/admin/*"
							element={
								<Main
									toggleTheme={toggleTheme}
									isDarkTheme={isDarkTheme}
								/>
							}
						/>
					</Routes>

					{/* <Background isDarkTheme={isDarkTheme} /> */}
				</div>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
