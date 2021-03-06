console.log("working js file");
$(document).ready(() => {
	let apiKeys;
	let myAPI = "";
	let forecastWeather = [];
	let currentWeather = [];


	//FIREBASE INITIALIZING
	weatherAPI.firebaseCredentials().then((firebaseKeys) => {
		apiKeys = firebaseKeys;
		firebase.initializeApp(apiKeys);
		// FbAPI.writeDom(apiKeys);
	}).catch((error) => {
		console.log("key errors", error);
	});
	
	const writeForecastWeatherDOM = (forecastArray, id) => {
		$("#forecast").html("");
		let foreCastWeatherString = "";
		for (let i = 0; i < parseInt(id); i++) {
			foreCastWeatherString += `<div class="col-sm-4">`;
			foreCastWeatherString += `<h4 class="bkg-red locationTitle">LOCATION AND DATE</h3>`;
			foreCastWeatherString += `<div class="container"><p>${forecastArray[i].main.temp_max}</p>`;
			foreCastWeatherString += `<p>${forecastArray[i].weather[0].main}</p>`;
			foreCastWeatherString += `<p>${forecastArray[i].weather[0].description}</p>`;
			foreCastWeatherString += `<p>${forecastArray[i].main.pressure}</p>`;
			foreCastWeatherString += `<p>${forecastArray[i].wind.speed}</p>`;
			foreCastWeatherString += `</div></div>`;
		}
		$("#forecast").append(foreCastWeatherString);
		if (parseInt(id) === 3) {
			console.log("passing if");
			$("#forecast").append(`<button class="sevenDay" id="7">SEE FULL WEEK FORECAST</button>`);
			fullWeekClick();
		}
	};


	const writeCurrentWeatherDOM = (currentWeatherArray) => {
		let currentWeatherString = "";
		currentWeatherString += `<div class="row"><div class="container">`;
		currentWeatherString += `<p>Temp: ${currentWeatherArray.temp}</p>`;
		currentWeatherString += `<p>Current Weather: ${currentWeatherArray.weather}</p>`;
		currentWeatherString += `<p>Description: ${currentWeatherArray.description}</p>`;
		currentWeatherString += `<p>Pressure: ${currentWeatherArray.pressure}</p>`;
		currentWeatherString += `<p>Wind Speed: ${currentWeatherArray.wind}mph</p>`;
		currentWeatherString += ``;
		currentWeatherString += ``;
		currentWeatherString += `</div></div>`;
		$(".currentWeather").html(currentWeatherString);
	};

	const moreClick = () => {
		$(".threeDay").on("click", (e) => {
			$(".threeDay").hide();
			let id = e.target.id;
			const zipcode = $("#userZipcode").val();
			loadForecastWeather(zipcode).then((weatherResults) => {
				getForecastWeatherInfo(weatherResults.list, id);
			}).catch((dataFail) => {
				console.log(dataFail);
			});
		});
	};
	const fullWeekClick = () => {
		$(".sevenDay").on("click", () => {
			let id = $(".sevenDay")[0].id;
			writeForecastWeatherDOM(forecastWeather, id);
		});
	};

	const getCurrentWeatherInfo = (currentWeatherResults) => {
		currentWeather.temp = currentWeatherResults.main.temp;
		currentWeather.pressure = currentWeatherResults.main.pressure;
		currentWeather.weather = currentWeatherResults.weather[0].main;
		currentWeather.description = currentWeatherResults.weather[0].description;
		currentWeather.wind = currentWeatherResults.wind.speed;

		writeCurrentWeatherDOM(currentWeather);
		$("#currentWeather").append(`<button class="threeDay" id="3">THREE DAY FORECAST</button>`);
		moreClick();

	};

	const getForecastWeatherInfo = (dataResults, id) => {
		//put an if statement to check id (3 days or 7 days);
		for (let x = 0; x < 7; x++) {
			forecastWeather.push(dataResults[x]);
		}
		writeForecastWeatherDOM(forecastWeather, id);
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

	//REGISTER AND LOGIN ACTIONS

	$("#register").click(() => {
		let email = $("#userEmail").val();
		let password = $("#userPassword").val();
		let username = $("#userName").val();

		let user = {email, password};
		weatherAPI.registerUser(user).then((response) => {
			let newUser = {
				uid: response.uid,
				username: username
			};

			weatherAPI.addUser(apiKeys, newUser).then((response) => {
				weatherAPI.loginUser(user).then((response) => {
					// clearLogin();
					$(".signInContainer").addClass("hide");
					$(".inputContainer").removeClass("hide");
					// FbAPI.writeDom(apiKeys);
				}).catch((error) => {
					console.log("login error: ", error);
				});
			}).catch((newUserError) => {
				console.log("add user error: ", newUserError);
			});
		}).catch((error) => {
			console.log("register user error: ", error);
		});
	});

	$("#login").click(() => {
		let email = $("#userEmail").val();
		let password = $("#userPassword").val();
		console.log("login working");

		let user = {email, password};
		weatherAPI.loginUser(user).then((response) => {
			// clearLogin();
			$(".signInContainer").addClass("hide");
			$(".inputContainer").removeClass("hide");
			console.log("dom, loginUser", response);
			// FbAPI.writeDom(apiKeys);
			// FbAPI.writeDomLogoutBtn(apiKeys);
		}).catch((error) => {
			console.log("login error: ", error);
		});
	});
	














});