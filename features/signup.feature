@tag1
Feature: signup feature
	Signup route have to create new users or throw an exception when the new user send wrong neccesary data.

	@tag3
	Scenario Outline: Create a new user on watch dog service system
		Given A new user try to signup
		When new user with json <data> call to "/auth/signup"
		Then should user create and get status "200" and message "User saved successfully"
		Examples:
			| data                                                                                                                                                                               |
			| { fullname: 'Alberto Iglesias', username: 'albertoig', password: '1234', birthdate: '01/01/2001', email: 'alberto.uchiha@gmail.com', mobilephone: '666555444', codecountry: '+34'} |
			| { fullname: 'Carlos Iglesias', username: 'carlosig', password: '5678', birthdate: '01/01/2001', email: 'carlos.uchiha@gmail.com', mobilephone: '4453564334', codecountry: '+34'}   |
