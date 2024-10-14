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

export const navItems = [
	{ title: "Промоутеры", sections: ["Промоутеры", "База кандидатов"] },
	{
		title: "Деньги",
		sections: ["Баланс активности", "Удержания", "История"],
	},
	{
		title: "Продажи",
		sections: ["Статистика", "Яндекс Плюс", "Мое расписание"],
	},
	{
		title: "Расписание",
		sections: ["Расписание", "Аудит расписания", "Видеоселфи"],
	},
	{ title: "Сверка", sections: ["Сверка"] },
	{ title: "Срез", sections: ["Срез Яндекс", "Расписания"] },
];
