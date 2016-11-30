@signin
Feature: Signin feature
	Signin route have to create a JWT toke for the users or throw an exception when the user is requesting it.

	@valid_users
	Scenario Outline: A correct user signin with the username
		Given A user trying to signip on the route "/auth/signip"
		When he send his <data> to sign in
		Then he should receive a correct token
		And code "200"
		Examples:
			| data                                                                                                                                                                                                        |
			| { "username": "albertig", "password": "albertoig"    |
			| { "username": "punisher", "password": "albertoig"    |
			| { "username": "", "password": "albertoig"    |
			| { "username": "albertig", "password": "albertoig"    |
			| { "username": "albertig", "password": "albertoig"    |

	@valid_users
	Scenario Outline: A correct user signin with the mobile phone
		Given A user trying to signip on the route "/auth/signip"
		When he send his <data> to sign in
		Then he should receive a correct token
		And code "200"
		Examples:
			| data                                                                                                                                                                                                        |
			| { "username": "albertig", "password": "albertoig"    |
			| { "username": "punisher", "password": "albertoig"    |
			| { "username": "", "password": "albertoig"    |
			| { "username": "albertig", "password": "albertoig"    |
			| { "username": "albertig", "password": "albertoig"    |

