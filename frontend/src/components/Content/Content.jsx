import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { urlsMap } from "../../utils/urls";

import { Paper, Typography } from "@mui/material";

import Promoters from "../../pages/Promoters/Promoters";
import CandidateDB from "../../pages/CandidateDB/CandidateDB";
import ActivityBalance from "../../pages/ActivityBalance/ActivityBalance";
import Fines from "../../pages/Fines/Fines";
import History from "../../pages/History/History";
import Statistics from "../../pages/Statistics/Statistics";

import classes from "./Content.module.css";

const Content = () => {
	const location = useLocation();

	const currentUrl = location.pathname.split("/")[2];

	const activeTab = Object.entries(urlsMap)
		.filter(([key, value]) => value === currentUrl)
		.map(([key]) => key);

	return (
		<Paper className={classes.content}>
			<Typography variant="h5" className={classes.title}>
				{activeTab}
			</Typography>

			<Routes>
				<Route path="/promoters" element={<Promoters />} />
				<Route path="/candidates" element={<CandidateDB />} />
				<Route path="/balance" element={<ActivityBalance />} />
				<Route path="/fines" element={<Fines />} />
				<Route path="/history" element={<History />} />
				<Route path="/statistics" element={<Statistics />} />
				<Route path="*" element={<Navigate to="/error" replace />} />
			</Routes>
		</Paper>
	);
};

export default Content;
