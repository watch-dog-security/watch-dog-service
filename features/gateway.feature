@gateway
Feature: Gateway feature
	Gateway redirect to other services that just can be accessible for Watch dog service.

	@service_one
	Scenario Outline: Access to api rest service one under watch dog service protection.
		Given A list of users
		When <user> call to <route> with token <token>
		Then should get <status_response>
		And should get <message_response>
		Examples:
			| user      | token | route         | status_response | message_response |
			| albertoig | x     | /gateway/test | 200             | a                |
			| alejandro | y     | /gateway/test | 401             | b                |
			| punisher  | z     | /gateway/test | 404             | c                |
