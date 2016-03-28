# watch-dog-service
[![Coverage Status](https://coveralls.io/repos/github/albertoig/watch-dog-service/badge.svg?branch=master)](https://coveralls.io/github/albertoig/watch-dog-service?branch=master) [![Build Status](https://travis-ci.org/albertoig/watch-dog-service.svg?branch=master)](https://travis-ci.org/albertoig/watch-dog-service)

AVISO: El proyecto aún está en desarrollo, no se recomienda la utilización del proyecto hasta que termine la release 1.0-beta.

Pasarela de login y control de de seguridad de servicios. EL proyecto está orientado sobre todo al desarrollo de micro 
servicios. Una de las ventajas de este modelo es la simplificación y reutilización, ya que las llamadas están desacopladas.

Las tecnologías usadas en este proyecto son:

- NodeJS.
- Javascript ES6.
- JSON.
- MongoDB.
- Redis.
- Mocha TDD.
- Nodemon a través de traceur-runner.
- ESLINT.

How to
------
Primero hay que copiar el archivo config/server/config_sample.json a config/server/config.json y rellenar la información 
correspondiente a las caracteristicas de nuestros servidores mongodb, redis, app y jwt. 
Además el proyecto dispone de test, por lo tanto es muy recomendable siempre ejecutarlos después de terminar la configuración.

Para ejecutar los test utilizar el siguiente comando:

`npm run test --harmony`

La forma de poner a funcionar el proyecto es con el siguiente comando:

`node app.js`

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
