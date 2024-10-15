export function inputValidation(field, value, password0) {
	const passwordRegex =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
	const usernameRegex = /^[A-Za-z0-9]{4,}$/;
	const nameRegex = /^[A-ZА-Я][a-zа-яё-]*([-'][A-ZА-Я][a-zа-яё-]*)*$/;
	const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	const phoneRegex = /^(8\d{10}|\+\d{11})$/;
	const passportNumberRegex = /^\d{10}$/;
	const issuedByRegex = /^[А-Яа-я\s]+$/;
	const divisionCodeRegex = /^\d{6}$/;
	const addressRegex = /^[А-Яа-я\s\d,.-]+$/;
	const innRegex = /^(?:\d{10}|\d{12})$/;
	const date = new Date(value);
	const currentDate = new Date();

	if (field === "password0") {
		return (
			passwordRegex.test(value) ||
			"Пароль должен содержать минимум 7 символов, включая заглавные и строчные латинские буквы, цифру и спец. символ (@, $, и т.д.)"
		);
	}
	if (field === "password" && password0) {
		return value === password0 || "Пароли не совпадают!";
	}
	if (field === "username") {
		return (
			usernameRegex.test(value) ||
			"Логин должен содержать только латинские буквы и цифры и быть не короче 4 символов."
		);
	}
	if (field === "name" || field === "surname" || field === "patronymic") {
		const initials = {
			name: "имени",
			surname: "фамилии",
			patronymic: "отчества",
		};

		return (
			nameRegex.test(value) ||
			`Первая буква ${
				initials[
					Object.keys(initials).filter(
						(initial) => initial === field
					)[0]
				]
			} должна быть заглавной, не содержать цифры и недопустимые символы`
		);
	}
	if (field === "date_of_birth") {
		if (date > currentDate) {
			return "Не верная дата";
		} else if (dateRegex.test(value)) {
			return dateRegex.test(value);
		} else {
			return "Дата должна быть в формате: ГГГГ-ММ-ДД";
		}
	}
	if (field === "parentPhone") {
		return (
			phoneRegex.test(value) ||
			"Некорректный формат телефона. Допустимй формат +7 (xxx) xxx xx-xx или 8 (xxx) xxx xx-xx, без скобок и пробелов"
		);
	}
	if (field === "passportNumber") {
		return (
			passportNumberRegex.test(value) ||
			"Серия и номер паспорта должны содержать 10 цифр."
		);
	}
	if (field === "issuedBy") {
		return (
			issuedByRegex.test(value) ||
			'Поле "Кем выдан" должно содержать только буквы русского алфавита.'
		);
	}
	if (field === "issueDate") {
		if (date > currentDate) {
			return "Не верная дата";
		} else if (dateRegex.test(value)) {
			return dateRegex.test(value);
		} else {
			return "Дата выдачи паспорта должна быть в формате ГГГГ-ММ-ДД";
		}
	}
	if (field === "divisionCode") {
		return (
			divisionCodeRegex.test(value) ||
			"Код подразделения должен содержать 6 цифр."
		);
	}
	if (field === "registrationAddress") {
		return (
			addressRegex.test(value) ||
			"Адрес регистрации должен содержать только кириллицу, цифры и символы."
		);
	}
	if (field === "residenceAddress") {
		return (
			addressRegex.test(value) ||
			"Адрес проживания должен содержать только кириллицу, цифры и символы."
		);
	}
	if (field === "inn") {
		return innRegex.test(value) || "ИНН должен содержать 10 или 12 цифр.";
	}
}

export function ageValidation(date_of_birth) {
	const date = new Date(date_of_birth);
	const currentDate = new Date();

	let age = currentDate.getFullYear() - date.getFullYear();
	const monthDifference = currentDate.getMonth() - date.getMonth();
	if (
		monthDifference < 0 ||
		(monthDifference === 0 && currentDate.getDate() < date.getDate())
	) {
		age--;
	}

	if (age < 18) {
		return true;
	}
}
