# watch-dog-service
AVISO: El proyecto aún está en desarrollo, no recomiendo la utilización del proyecto hasta que termine la release 1.0.

Pasarela de login y control de de seguridad de servicios. EL proyecto está orientado sobre todo al desarrollo de micro 
servicios. Una de las ventajas de este modelo es la simplificación y reutilización, ya que las llamadas están desacopladas.

Las tecnologías usadas en este proyecto son:

- NodeJS
- Javascript ES6
- JSON
- MongoDB
- Redis
- Mocha TDD

How to
------
Primero hay que copiar el archivo config/server/config_sample.json a config/server/config.json y rellenar la información 
correspondiente a las caracteristicas de nuestros servidores mongodb, redis, app y jwt. 
Además el proyecto dispone de test, por lo tanto es muy recomendable siempre ejecutarlos después de terminar la configuración.

Para ejecutar los test utilizar el siguiente comando:

`npm run test --harmony`

La forma de poner a funcionar el proyecto es con el siguiente comando:

`npm run app.js --harmony`

Development Rules
-----------------
Si deseas particiar en el proyecto puedes hacerlo siempre a través de pull request y se supervisará de ésta forma el código
que envies. Pero para ello debes seguir algunas normas de desarrollo bastante simples:

- Comillas simples siempre, olvidate de las comillas dobles al menos que sea estrictamente necesario.
- Usa siempre que se pueda promesas en vez de callbacks.
- El desarrollo de una features tiene que ir con sus respectivo test bien definido.
- Separa en módulos siempre que puedas.