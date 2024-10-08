import React, { useEffect } from "react";

import "../../../styles/Background.css";

const Background = ({ isDarkTheme }) => {
	useEffect(() => {
		const circles = [
			{ size: 700, xPos: -150, yPos: window.innerHeight - 350 }, // Левый нижний
			{ size: 700, xPos: window.innerWidth - 550, yPos: -250 }, // Правый верхний
			{
				size: 800,
				xPos: window.innerWidth / 2 - 100,
				yPos: window.innerHeight / 2 - 100 + 50,
			}, // Чуть ниже центра, правее
		];

		const background = document.querySelector(".background");

		circles.forEach(({ size, xPos, yPos }) => {
			const circle = document.createElement("div");
			circle.classList.add("circle");

			circle.style.width = `${size}px`;
			circle.style.height = `${size}px`;
			circle.style.left = `${xPos}px`;
			circle.style.top = `${yPos}px`;

			background.appendChild(circle);
		});
	}, []);

	return (
		<div className={`background ${isDarkTheme ? "dark" : "light"}`}></div>
	);
};

export default Background;
