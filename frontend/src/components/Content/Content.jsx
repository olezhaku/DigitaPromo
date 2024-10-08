import React from "react";
import { useSelector } from "react-redux";

import { Paper, Typography } from "@mui/material";

import Promoters from "../../pages/Promoters/Promoters";
import CandidateDB from "../../pages/CandidateDB/CandidateDB";
import ActivityBalance from "../../pages/ActivityBalance/ActivityBalance";
import Fines from "../../pages/Fines/Fines";
import History from "../../pages/History/History";
import Statistics from "../../pages/Statistics/Statistics";

import classes from "./Content.module.css";
import { Route, Routes } from "react-router-dom";

const Content = () => {
	const activeTab = useSelector((state) => state.tab.tab);

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
			</Routes>
		</Paper>
	);
};

export default Content;
