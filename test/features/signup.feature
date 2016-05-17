@signup
Feature: Signup feature
	Signup route have to create new users or throw an exception when the new user send wrong neccesary data.

	@valid_users
	Scenario Outline: A correct user signup
		Given A new valid user
		When new user with json <data> call to "/auth/signup"
		Then should user create, get status "200" and message "User saved successfully"
		Examples:
			| data                                                                                                                                                                                             |
			| { "fullname": "Alberto Iglesias", "username": "albertoig", "password": "1234", "birthdate": "01/01/2002", "email": "alberto.uchiha@gmail.com", "mobilephone": "666555444", "codecountry": "+34"} |
			| { "fullname": "Carlos Iglesias", "username": "carlosig", "password": "5678", "birthdate": "01/01/2001", "email": "carlos.uchiha@gmail.com", "mobilephone": "4453564334", "codecountry": "+34"}   |

	@repeted_users
	Scenario Outline: A user signup with a repeted username
		Given A repeted username
		When he send his <data> to "/auth/signup"
		Then he should receive an error message "" with code "401"
		Examples:
			|  |

	@malformed_email
	Scenario Outline: A user try to signup on Watch dog service with incorrect email
		Given A user with incorrect email
		When he send his <data> to "/auth/signup"
		Then he should receive an error message "" with code "401"
		Examples:
			|  |

	@malformed_code_country
	Scenario Outline: A user try to signup on Watch dog service with incorrect code country
		Given A user with incorrect code country
		When he send his <data> to "/auth/signup"
		Then he should receive an error message "" with code "401"
		Examples:
			|  |
