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

/**
 * Parse JSON request to User Model
 * @param req
 * @returns {User}
 */
UserManager.parseJsonToUserModel = (req) => {
	try {
		let userJson = UserManager.getParsedBodyJSON(req.body);
		return UserManager.getUserFromJSON(userJson);
	} catch (exception) {
		throw exception;
	}
};

/**
 *º Parse body to JSON or throw exception when is undefined
 * @param body
 * @return JSON
 */
UserManager.getParsedBodyJSON = (body) => {
	if(body === undefined){
		throw new Error(__('Body to parse to JSON is undefined'));
	}

	return body;
};

/**
 * Make a new user object with JSON object, if something is not correct
 * will throw an Exception.
 * @param userJson
 * @returns {User}
 */
UserManager.getUserFromJSON = (userJson) => {
	if (!UserManager.checkUserFromJSON(userJson)) {
		throw new Error(__('User json formation is not correct'));
	}
	return new User(UserManager.makeUserFromJSON(userJson));
};


/**
 * Check if userJson properties are undefined or ''
 * @param userJson
 * @returns {boolean}
 */
UserManager.checkUserFromJSON = (userJson) => {
	return !(userJson.fullname === undefined || userJson.username === undefined ||
	userJson.password === undefined || userJson.email === undefined ||
	userJson.codecountry === undefined || userJson.mobilephone === undefined ||
	userJson.birthdate === undefined ||

	userJson.fullname.trim() === '' || userJson.username.trim() === '' ||
	userJson.password.trim() === '' || userJson.email.trim() === '' ||
	userJson.codecountry.trim() === '' || userJson.mobilephone.trim() === '' ||
	userJson.birthdate.trim() === '');
};

/**
 * Return and object of UserModel can understand
 * @param userJson
 * @returns {JSON}
 */
UserManager.makeUserFromJSON = (userJson) => {
	return {
		fullName: userJson.fullname,
		userName: userJson.username,
		password: userJson.password,
		meta: {
			birthdate: userJson.birthdate
		},
		email: userJson.email,
		mobilePhone: userJson.mobilephone,
		codeCountry: userJson.codecountry
	};
};

/**
 * Will find on database if user exist or not, could throw and Exception if
 * UserOptions is not correct.
 * @param userAuthHeader
 * @returns {Promise}
 */
UserManager.checkUserFromDB = (userAuthHeader) => {
	return new Promise((resolve, reject) => {
		let options;

		try {
			options = UserManager.makeOptionsWithUserModel(userAuthHeader);
		} catch (exception) {
			throw exception;
		}

		User.find(options, (err, user) => {
			if (err) {
				reject(err);
			} else {
				resolve(user);
			}
		});
	});
};

/**
 * Return options, if user is not correct will throw an Error
 * @param user
 * @returns {{userName: (string), password: (string)}}
 */
UserManager.makeOptionsWithUserModel = (user) => {
	if (user.userName === undefined || user.password === undefined ||
		user.userName.trim() === '' || user.password.trim() === '') {
		throw new Error(__('User options is not correct'));
	} else {
		return {
			userName: user.userName,
			password: user.password
		};
	}
};

module.exports = UserManager;
