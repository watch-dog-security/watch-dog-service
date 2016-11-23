@gateway
Feature: Gateway feature
	Gateway redirect to other services that just can be accessible for Watch dog service, services can be public or
	private for a determinate groups of users or specific users, also the gateway should register the access for these
	services on a access log.

	##############
	# NO SERVICE #
	##############



	################
	# PUBLIC CALLS #
	################

	@public_service_hello_world_registered_users
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with a registered
	user. The server should grant access to the public service.
		Given A <user>
		And with token <user_token>
		When call to <route>
		Then should get status response "200"
		And should get "Hello world" message.
		Examples:
			| user      | user_token | route          |
			| albertoig | x          | /gateway/hello |
			| alejandro | y          | /gateway/hello |
			| punisher  | z          | /gateway/hello |
			| mrrobot   | a          | /gateway/hello |
			| malek     | t          | /gateway/hello |

	@public_service_hello_world_registered_users_attempts
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with a registered
	user. When the server have a lot of attempts have to control and revoke these calls for security and prevent.
		Given A <user>
		And with token <user_token>
		When call to <route>
		And try to call it <attempts> times
		Then should get status response "401"
		And should get "Revoked user token and blocked user for a while." message.
		Examples:
			| user      | user_token | route          | attempts |
			| albertoig | x          | /gateway/hello | 100      |
			| alejandro | y          | /gateway/hello | 200      |
			| punisher  | z          | /gateway/hello | 300      |
			| mrrobot   | a          | /gateway/hello | 400      |
			| malek     | t          | /gateway/hello | 50       |

	@public_service_hello_world_registered_users_no_valid_token
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with a registered
	user. The server should manage the correct message when the token is not correct.
		Given A <user>
		And with token <user_token>
		When call to <route>
		Then should get status response "401"
		And should get "No valid token" message.
		Examples:
			| user      | user_token | route          |
			| albertoig | a          | /gateway/hello |
			| alejandro | b          | /gateway/hello |
			| punisher  | c          | /gateway/hello |
			| mrrobot   | d          | /gateway/hello |
			| malek     | e          | /gateway/hello |

	@public_service_hello_world_anonymous_users
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with unregistered
	users. The server should grant access to the public service.
		Given An anonymous user
		And with public token <public_token>
		When call to <route>
		Then should get status response "200"
		And should get "Hello world" message.
		Examples:
			| public_token | route          |
			| x            | /gateway/hello |
			| y            | /gateway/hello |
			| z            | /gateway/hello |

	@public_service_hello_world_anonymous_users_no_valid_public_token
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with unregistered
	users. The server should manage the correct message when the token is not correct.
		Given An anonymous user
		And with public token <public_token>
		When call to <route>
		Then should get status response "401"
		And should get "No valid public token." message.
		Examples:
			| public_token | route          |
			| x            | /gateway/hello |
			| y            | /gateway/hello |
			| z            | /gateway/hello |

	@public_service_hello_world_anonymous_users_attempts
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with unregistered
	users. For security the server should revoke public token and not permit to access to public services.
		Given An anonymous user
		And with public token <token>
		When call to <route>
		And try to call it <attempts> times
		Then should get status response "401"
		And should get "Revoked public token and blocked user for a while."
		Examples:
			| token | route          | attempts |
			| x     | /gateway/hello | 200      |
			| y     | /gateway/hello | 500      |
			| z     | /gateway/hello | 300      |


	#################
	# PRIVATE CALLS #
	#################

	@private_service_hello_world_with_anonymous_users
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with unregistered
	users. For security the server should revoke public token and not permit to access to public services.
		Given An anonymous user
		And with public token <token>
		When call to <route>
		And try to call it <attempts> times
		Then should get status response "404"
		And should get "Resource not found."
		Examples:
			| token | route                  |
			| x     | /gateway/private_hello |
			| y     | /gateway/private_hello |
			| z     | /gateway/private_hello |

	@private_service_hello_world_with_anonymous_users_attempts
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with unregistered
	users. For security the server should revoke public token and not permit to access to public services.
		Given An anonymous user
		And with public token <token>
		When call to <route>
		And try to call it <attempts> times
		Then should get status response "401"
		And should get "Revoked public token and blocked user for a while."
		Examples:
			| token | route                  | attempts |
			| x     | /gateway/private_hello | 200      |
			| y     | /gateway/private_hello | 500      |
			| z     | /gateway/private_hello | 300      |

	@private_service_hello_world_user_with_permission
	Scenario Outline: Access to api rest private service "Hello world" under watch dog service protection with a registered
	user.
		Given A <user>
		And with token <user_token>
		When call to <route>
		Then should get <status_response>
		And should get <message_response>
		Examples:
			| user      | user_token | route                  | status_response | message_response |
			| albertoig | x          | /gateway/private_hello | 200             | Hello world      |
			| alejandro | y          | /gateway/private_hello | 401             | Hello world      |
			| punisher  | z          | /gateway/private_hello | 401             | Hello world      |

	@private_service_hello_world
	Scenario Outline: Access to api rest private service "Hello world" under watch dog service protection with a unregistered
	users.
		Given A <user>
		When call to <route>
		And with <token>
		Then should get <status_response>
		And should get <message_response>
		Examples:
			| user      | token | route                  | status_response | message_response |
			| albertoig | x     | /gateway/private_hello | 200             | Hello world      |
			| alejandro | y     | /gateway/private_hello | 401             | Hello world      |
			| punisher  | z     | /gateway/private_hello | 401             | Hello world      |

	@private_service_hello_world_registered_users_no_valid_token
	Scenario Outline: Access to api rest public service "Hello world" under watch dog service protection with unregistered
	users with 200 responses.
		Given An anonymous user
		And with public token <user_token>
		When call to <route>
		Then should get status response "200"
		And should get "Hello world" message.
		Examples:
			| user_token | route          |
			| x          | /gateway/hello |
			| y          | /gateway/hello |
			| z          | /gateway/hello |
