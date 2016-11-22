@signup
Feature: Signup feature
	Signup route have to create new users or throw an exception when the new user send wrong neccesary data.

	@valid_users
	Scenario Outline: A correct user signup
		Given A user trying to signup on the route "/auth/signup"
		When he send his <data>
		Then he should receive the message "User saved successfully"
		And code "200"
		Examples:
			| data                                                                                                                                                                                                        |
			| { "fullname": "Alberto Iglesias Gallego", "username": "albertoig", "password": "1234", "birthdate": "01/01/2002", "email": "alberto.uchiha@gmail.com", "mobilephone": "666555444", "codecountry": "+34"}    |
			| { "fullname": "Norman Reedus", "username": "normanReedus00", "password": "WalkingDead001", "birthdate": "01/06/1969", "email": "norman.reedus@gmail.com", "mobilephone": "4453564334", "codecountry": "+1"} |
			| { "fullname": "Andrew Lincoln", "username": "andrew0Lincoln", "password": "Test01", "birthdate": "08/14/1973", "email": "andrewLincoln@hotmail.com", "mobilephone": "767656545", "codecountry": "+44"}      |
			| { "fullname": "Steven Yeun", "username": "StevenYeun", "password": "1234", "birthdate": "12/21/1983", "email": "stevenYeun@gmail.com", "mobilephone": "643452344", "codecountry": "+82"}                    |
			| { "fullname": "Lauren Cohan", "username": "laurenCohan", "password": "Qw3rty01", "birthdate": "01/07/1983", "email": "LaurenCohan@gmail.com", "mobilephone": "54323423", "codecountry": "+1"}               |

	@repeted_users
	Scenario Outline: A user signup with a repeted username
		Given A user trying to signup on the route "/auth/signup"
		When he send his <data>
		Then he should receive the message "E11000 duplicate key error index"
		And code "401"
		Examples:
			| data                                                                                                                                                                                                        |
			| { "fullname": "Alberto Iglesias Gallego", "username": "albertoig", "password": "1234", "birthdate": "01/01/2002", "email": "alberto.uchiha@gmail.com", "mobilephone": "666555444", "codecountry": "+34"}    |
			| { "fullname": "Norman Reedus", "username": "normanReedus00", "password": "WalkingDead001", "birthdate": "01/06/1969", "email": "norman.reedus@gmail.com", "mobilephone": "4453564334", "codecountry": "+1"} |
			| { "fullname": "Andrew Lincoln", "username": "andrew0Lincoln", "password": "Test01", "birthdate": "08/14/1973", "email": "andrewLincoln@hotmail.com", "mobilephone": "767656545", "codecountry": "+44"}      |
			| { "fullname": "Steven Yeun", "username": "StevenYeun", "password": "1234", "birthdate": "12/21/1983", "email": "stevenYeun@gmail.com", "mobilephone": "643452344", "codecountry": "+82"}                    |
			| { "fullname": "Lauren Cohan", "username": "laurenCohan", "password": "Qw3rty01", "birthdate": "01/07/1983", "email": "LaurenCohan@gmail.com", "mobilephone": "54323423", "codecountry": "+1"}               |

	@no_data
	Scenario Outline: A user signup with no data on call
		Given A user trying to signup on the route "/auth/signup"
		When he send his <data>
		Then he should receive the message "You must to add data to body request"
		And code "401"
		Examples:
			| data |
			|      |
			| {}   |

