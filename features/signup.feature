@signup
Feature: Signup feature
	Signup route have to create new users or throw an exception when the new user send wrong neccesary data.

	@valid_users
	Scenario Outline: A correct user signup
		Given A user trying to signup on the route "/auth/signup"
		When he send his <data>
		Then he should receive the message "User saved successfully" with code "200"
		Examples:
			| data                                                                                                                                                                                                     |
			| { "fullname": "Alberto Iglesias Gallego", "username": "albertoig", "password": "1234", "birthdate": "01/01/2002", "email": "alberto.uchiha@gmail.com", "mobilephone": "666555444", "codecountry": "+34"} |
			| { "fullname": "Carlos Iglesias", "username": "carlosig", "password": "5678", "birthdate": "01/01/2001", "email": "carlos.uchiha@gmail.com", "mobilephone": "4453564334", "codecountry": "+34"}           |

	@repeted_users
	Scenario Outline: A user signup with a repeted username
		Given A user trying to signup on the route "/auth/signup"
		When he send his <data>
		Then he should receive the message "bla bla bla" with code "401"
		Examples:
			| data                                                                                                                                                                                             |
			| { "fullname": "Alberto Iglesias", "username": "albertoig", "password": "1234", "birthdate": "01/01/2002", "email": "alberto.uchiha@gmail.com", "mobilephone": "666555444", "codecountry": "+34"} |
			| { "fullname": "Carlos Iglesias", "username": "carlosig", "password": "5678", "birthdate": "01/01/2001", "email": "carlos.uchiha@gmail.com", "mobilephone": "4453564334", "codecountry": "+34"}   |

	@malformed_email
	Scenario Outline: A user try to signup on Watch dog service with incorrect email
		Given A user trying to signup on the route "/auth/signup"
		When he send his <data>
		Then he should receive the message "Email syntax is not correct" with code "401"
		Examples:
			| data                                                                                                                                                                                             |
			| { "fullname": "Alberto Iglesias", "username": "albertoig", "password": "1234", "birthdate": "01/01/2002", "email": "alberto.uchiha@gmail.com", "mobilephone": "666555444", "codecountry": "+34"} |
			| { "fullname": "Carlos Iglesias", "username": "carlosig", "password": "5678", "birthdate": "01/01/2001", "email": "carlos.uchiha@gmail.com", "mobilephone": "4453564334", "codecountry": "+34"}   |

	@malformed_code_country
	Scenario Outline: A user try to signup on Watch dog service with incorrect code country
		Given A user trying to signup on the route "/auth/signup"
		When he send his <data>
		Then he should receive the message "Country code is not correct" with code "401"
		Examples:
			| data                                                                                                                                                                                             |
			| { "fullname": "Alberto Iglesias", "username": "albertoig", "password": "1234", "birthdate": "01/01/2002", "email": "alberto.uchiha@gmail.com", "mobilephone": "666555444", "codecountry": "+34"} |
			| { "fullname": "Carlos Iglesias", "username": "carlosig", "password": "5678", "birthdate": "01/01/2001", "email": "carlos.uchiha@gmail.com", "mobilephone": "4453564334", "codecountry": "+34"}   |
