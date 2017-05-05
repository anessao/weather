console.log("working js file");
$(document).ready(() => {
	const myAPI = "";
	//SET DOM ELEMENTS FOR USER TO INTERACT WITH
	const writeDOM = () => {

	};
	const moreClick = () => {
		$(".moreDays").on("click", () => {
			const zipcode = $("#userZipcode").val();
			console.log("click working", zipcode);
			loadForecastWeather(zipcode).then((weatherResults) => {
				getForecastWeatherInfo(weatherResults.list);
			}).catch((dataFail) => {
				const failMessage = dataFail.responseJSON.message;
				$("#results").html("");
				$("#results").html(failMessage);
			});
		});
	}

	const getCurrentWeatherInfo = (currentWeatherResults) => {
		console.log("current temp: ", currentWeatherResults.main.temp);
		console.log("current pressure: ", currentWeatherResults.main.pressure);
		console.log("current conditions: ", currentWeatherResults.weather[0].main);
		console.log("current conditions description: ", currentWeatherResults.weather[0].description);
		console.log("wind speed in mph", currentWeatherResults.wind.speed);
		console.log("add a 3 day and 7 day forecast button");
		$("#currentWeather").html(`<button class="moreDays">MORE DAYS</button>`);
		moreClick();

	};

	const getForecastWeatherInfo = (dataResults) => {
		//put an if statement to check id (3 days or 7 days);
		let fullForecast = dataResults;
		let currentWeather = [];
		let threeDayForecast = [];
		console.log("date", dataResults[0].dt_txt);
		console.log("max temp", dataResults[0].main.temp_max);
		console.log("min temp", dataResults[0].main.temp_min);
		console.log("conditions", dataResults[0].weather[0].main);
		console.log("condition details", dataResults[0].weather[0].description);
		console.log("pressure", dataResults[0].main.pressure);
		console.log("wind speed in mph", dataResults[0].wind.speed);
	};

	const loadCurrentWeather = (userInput) => {
		return new Promise((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${userInput},us&units=imperial&APPID=${myAPI}`)
			.done((data) => {
				resolve(data);
			}).fail((error) => {
				reject(error);
			});
		});
	};

	const loadForecastWeather = (userInput) => {
		return new Promise((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${userInput},us&units=imperial&APPID=${myAPI}`)
			.done((data1) => {
				resolve(data1);
			}).fail((error1) => {
				reject(error1);
			});
		});
	};

	$("#submit-btn").on("click", () => {
		const zipcode = $("#userZipcode").val();
		loadCurrentWeather(zipcode).then((weatherResults) => {
			getCurrentWeatherInfo(weatherResults);
		}).catch((dataFail) => {
			const failMessage = dataFail;
			$("#results").html("");
			$("#results").html(failMessage);
		});
	});

	






































});