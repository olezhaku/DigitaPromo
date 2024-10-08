import { createSlice } from "@reduxjs/toolkit";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DataObjectSharpIcon from "@mui/icons-material/DataObjectSharp";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HistoryIcon from "@mui/icons-material/History";
import StackedLineChartSharpIcon from "@mui/icons-material/StackedLineChartSharp";
import YandexPlusIcon from "../components/Icons/YandexPlusIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";

export const iconMap = {
	Промоутеры: PersonOutlineOutlinedIcon,
	"База кандидатов": DataObjectSharpIcon,
	"Баланс активности": AutoGraphIcon,
	Удержания: HighlightOffIcon,
	История: HistoryIcon,
	Статистика: StackedLineChartSharpIcon,
	"Яндекс Плюс": YandexPlusIcon,
	"Мое расписание": FormatListBulletedIcon,
	Расписание: CalendarMonthOutlinedIcon,
	"Аудит расписания": EditCalendarOutlinedIcon,
	Видеоселфи: VideoCameraFrontOutlinedIcon,
	Сверка: SearchIcon,
	"Срез Яндекс": YandexPlusIcon,
	Расписания: TodayOutlinedIcon,
};

const initialState = {
	active: { title: 0, section: 0 },
	tab: "Промоутеры",
	items: [
		{
			title: "Промоутеры",
			sections: {
				Промоутеры: [],
				"База кандидатов": [],
			},
		},
		{
			title: "Деньги",
			sections: {
				"Баланс активности": [],
				Удержания: [],
				История: ["История", "Статистика"],
			},
		},
		{
			title: "Продажи",
			sections: {
				Статистика: [],
				"Яндекс Плюс": [],
				"Мое расписание": [],
			},
		},
		{
			title: "Расписание",
			sections: {
				Расписание: [],
				"Аудит расписания": [
					"Аудит расписания",
					"Сверка аудитов расписания",
				],
				Видеоселфи: ["Видеоселфи", "Сверка видеоселфи"],
			},
		},
		{
			title: "Сверка",
			sections: {
				Сверка: [],
			},
		},
		{
			title: "Срез",
			sections: {
				"Срез Яндекс": [],
				Расписания: [],
			},
		},
	],
};

const tabSlice = createSlice({
	name: "tab",
	initialState,
	reducers: {
		setActive: (state, action) => {
			const { title, section } = action.payload;
			const selectedTab = state.items[title];

			if (selectedTab) {
				state.active = { title, section };
				const sectionKeys = Object.keys(selectedTab.sections);

				if (sectionKeys[section]) {
					state.tab = sectionKeys[section];
				}
			}
		},
		resetTabIndex: (state) => {
			state.active = { title: 0, section: 0 };
		},
	},
});

export const { setActive, resetTabIndex } = tabSlice.actions;
export default tabSlice.reducer;
