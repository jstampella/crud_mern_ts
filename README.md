ABM USUARIO
Descripción
Este proyecto es una aplicación web construida utilizando el framework de front-end React junto con TypeScript. La aplicación también utiliza las siguientes bibliotecas y herramientas: Axios, Redux Toolkit, React Router DOM y js-cookie. El objetivo principal de la aplicación es proporcionar funcionalidades de inicio de sesión con token, registro de usuarios, creación, edición y eliminación de clientes, así como también mostrar los últimos registros de clientes. Además, la aplicación ofrece validación de formularios, gestión de contexto y la opción de elegir entre un tema oscuro y uno claro.

El backend de esta aplicación está construido utilizando Node.js v16 y Express. Se utiliza la biblioteca express-validator para validar los datos de entrada antes de utilizarlos en la lógica del servidor. Otras bibliotecas incluidas en el backend son Mongoose, para interactuar con la base de datos MongoDB, Winston, para la gestión de registros y Morgan, para el registro de solicitudes HTTP.

La base de datos utilizada es MongoDB, que proporciona soporte en español.

Configuración
Asegúrese de tener Node.js o Docker instalados en su máquina.

Deployment
Con Docker “Production”
Clonar este repositorio.
Ejecutar el docker-compose up -d
dirigirse a http://localhost:7000
Configuración del Frontend - “Development”
Clonar este repositorio.
Navegar a la carpeta client.
Ejecutar yarn install para instalar las dependencias.
Ejecutar yarn run dev para iniciar el servidor de desarrollo.
Configuración del Backend - “Development”
Clonar este repositorio.
Navegar a la carpeta raiz.
Ejecutar el docker-compose -f docker-compose.dev.yml up -d (db)
Ejecutar yarn install para instalar las dependencias.
Configurar las variables de entorno en el archivo .env -> copiar la info de .env.template .
Ejecutar yarn run dev para iniciar el servidor.
dirigirse a http://localhost:7000/api
Uso
Una vez que el servidor de desarrollo esté en funcionamiento, puede acceder a la aplicación web desde su navegador ingresando http://localhost:7000, para la api desde http://localhost:7000/api
Licencia
Este proyecto está bajo la Licencia de Jonathan Stampella, para mas informacion jona.stampella@gmail.com
