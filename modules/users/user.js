'use strict';

let User = require('./../../models/user');
let payload = require('./../../modules/jwt/payload');
let UserManager = () => {
};

UserManager.parseUserToPayload = function (user) {
	return new Promise((resolve, reject) => {
		let _user = JSON.parse(user)[0];
		payload.createPayloadVerifiedPromise(_user._id, _user.userName).then((payload) => {
			resolve(payload);
		}).catch((error) => {
			reject(error);
		});
	});
};

UserManager.parseJsonToUserModel = (req) => {
	let userJson = JSON.parse(
		JSON.stringify(req.body)
	);
	return UserManager.getUserFromJSON(userJson);
};

UserManager.getUserFromJSON = (userJson) => {
	return new User({
		fullName: userJson.fullname,
		userName: userJson.username,
		password: userJson.password,
		meta: {
			birthdate: userJson.birthdate
		},
		email: userJson.email,
		mobilePhone: userJson.mobilephone,
		codeCountry: userJson.codecountry
	});
};

UserManager.checkUserFromDB = (userAuthHeader) => {
	return new Promise((resolve, reject) => {
		let options = UserManager.makeOptionsWithUserModel(userAuthHeader);

		User.find(options, (err, user) => {
			if (err) {
				reject(err);
			} else {
				resolve(user);
			}
		});
	});
};

UserManager.makeOptionsWithUserModel = (user) => {
	return {
		userName: user.userName,
		password: user.password
	};
};

module.exports = UserManager;
