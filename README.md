# Watch dog service
 [![Build Status](https://travis-ci.org/albertoig/watch-dog-service.svg?branch=master)](https://travis-ci.org/albertoig/watch-dog-service) [![Dependency Status](https://gemnasium.com/albertoig/watch-dog-service.svg)](https://gemnasium.com/albertoig/watch-dog-service) [![Coverage Status](https://coveralls.io/repos/github/albertoig/watch-dog-service/badge.svg?branch=master)](https://coveralls.io/github/albertoig/watch-dog-service?branch=master) [![Code Health](https://landscape.io/github/albertoig/watch-dog-service/master/landscape.svg?style=flat)](https://landscape.io/github/albertoig/watch-dog-service/master)

<p align="center">
	<img align="middle" src="http://www.albertchurch.com/wp-content/uploads/2016/04/wds_recortada.png" width="230" height="250">
</p>

AVISO: El proyecto aún está en desarrollo, no se recomienda la utilización del proyecto hasta que termine la release 1.0-beta.

# Descripción
Pasarela de login y control de de seguridad de servicios. EL proyecto está orientado sobre todo al desarrollo de micro 
servicios. Una de las ventajas de este modelo es la simplificación y reutilización, ya que las llamadas están desacopladas.

# Configuración
El proyecto consta de varios archivos JSON de configuración para manejar
los errores generales, conexiones con los servicios con MongoDB y Redis, 
la propia configuración de la APP, los niveles de seguridad y los tag multi-idioma.

### Configuración general
El archivo de configuración principal no viene por defecto en la aplicación
pero si viene un archivo config_sample.json en la siguiente ruta ./config/server/,
para poder ejecutar la aplicación en local solo hay que copiar el archivo config_sample.json 
y renombrarlo a config.json. 

Las secciones de ésta configutación son:

* app: configuraciones referentes al host Watch dog service.
* app.name: Nombre del servidor watch dog service.
* app.host: Dirección del host en el que vamos a hacer funcionar nuestro servidor.
* app.port: Puerto en el que va a funcionar nuestro servidor.
* app.password.check: 
* jwt: Sección de configuracion necesaria para utilizar la encriptación JWT.
* jwt.secret: Contraseña secreta necesaria para la encriptación del token JWT.
* jwt.verification: Si éste valor está a true hará una doble verificación del token tanto en el servidor redis como en mongoDB y 
además comprobará su integridad, en el caso de estar a false, solo comprobará este valor en redis pero permitirá una ejecución más rápida
de las llamadas.
* jwt.algorithm: Tipo de algoritmo para códificar el token JWT, los algoritmos
soportados para codificar y descodificar son HS256, HS384, HS512 y RS256.
* mongodb: Sección de configuraciones relativas al servidor mongodb que 
necesita Watch dog service para funcionar correctamente.
* mongodb.host: Host en el se encuentra el servidor mongodb funcionando.
* mongodb.port: Puerto en el que se encuentra el servidor mongodb.
* redis: Sección de configuracion del servidor redis.
* redis.host: Host donde reside el servidor redis.
* redis.port: Puerto donde está ejecutándose el servidor redis.

# Test
El proyecto está cubierto en su totalidad por test para garantizar el correcto
funcionamiento y la integridad de futuros desarrollos. Sí deseas ejecutar
los test para comprobar que el servidor se encuentra en perfectas condiciones
puedes hacerlo a través del siguiente comando:

`npm run test`

Además dispone de la herramienta istanbul para obtener informes de coverage
de la herramienta. Todos estos informes estarán en el directorio ./coverage.
Para ejecutar estos informes hay que ejecutar el siguiente comando:

`npm run test-travis`

Development Rules
-----------------
Si deseas particiar en el proyecto puedes hacerlo siempre a través de pull request y se supervisará de ésta forma el código
que envies. Se recomienda instalar eslint para el control de la calidad del código.

commits
-------

Aunque no se ha llevado buenas practicas durante todo el desarrollo sobre el contenido de los commits para realizarlo correctamente recomiendo leer los siguientes artículos:

- https://git-scm.com/book/ch5-2.html
- https://github.com/erlang/otp/wiki/writing-good-commit-messages
- http://chris.beams.io/posts/git-commit/

Para pasar los pull request deberá estar todo correctamente comentado con el máximo detalle posible.
