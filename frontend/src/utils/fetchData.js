import axios from "axios";

export async function fetchAuth(url, data, setLinkAuth) {
	// login register user
	try {
		const response = await axios.post(`http://127.0.0.1:5000/${url}`, data);
		console.log("Успех:", response.data);

		if (response.data.message === "Регистрация успешна") {
			setLinkAuth(response.data.telegramLink);
			// setToken(response.data.token);
			// navigate("/admin/statistics");
		}
	} catch (error) {
		if (error.response) {
			console.error("Ошибка ответа:", error.response.data);
			// setError(Object.values(error.response.data));
		} else {
			console.error("Ошибка сети или сервера:", error.message);
			// setError(["Ошибка сети или сервера"]);
		}
	}
}
