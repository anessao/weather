var weatherAPI = ((oldAPI) => {

	//EXAMPLE TO WORK THROUGH:

	oldAPI.registerUser = (credentials) => {
		return new Promise((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
			.then((authData) => {
				resolve(authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	oldAPI.loginUser = (userCreds) => {
		return new Promise((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(userCreds.email, userCreds.password)
			.then((authData) => {
				resolve(authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	oldAPI.credentialsCurrentUser = () => {
		return firebase.auth().currentUser;
	};

	oldAPI.logoutUser = () => {
		firebase.auth().signOut();
	};


	return oldAPI;
})(weatherAPI || {});