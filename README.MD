# Microservicios de Emax Peluqueria ✂️

Este proyecto es una extensión del turnero que realicé para el M2 del Bootcamp de Henry. Es mi primera aplicación que realizo siguiendo la arquitectura de microservicios. Pueden haber fallos y cosas que no sean correctas, pero esto recién es el comienzo. ¡Espero que sea de su agrado!

## Descripción

El proyecto está completamente bajo el entorno de Node.js. Se usaron los frameworks de NestJs y Express.js. Emax Peluquería es una aplicación en la cual se puede reservar un turno en un negocio con infinita disponibilidad, siempre y cuando sea en el horario laboral que indica el negocio. También, en su página se pueden comprar artículos específicos del negocio. Todo esto es observable en un dashboard de usuario donde se encuentra tu historial de pagos, inclusive.

### Microservicios

1. **[API Gateway](https://github.com/emacuello/emax-peluqueria-gateway)**: Punto de entrada al backend, recibe las solicitudes del cliente y se encarga de repartir las tareas a los diferentes microservicios. A su vez, cuando se trata del pago, de usuarios de Google, y para la subida de imágenes de perfil de usuario, es este servidor el encargado de hacerlo.
2. **[Microservicio de Auth, Users y Appointments](https://github.com/emacuello/emaxpeluqueria)**: Se encarga de registrar a los nuevos usuarios en la base de datos encriptando sus contraseñas con Bcrypt, verificar sus credenciales y emitir sus respectivos JWT, crear, modificar y eliminar turnos para los usuarios.
3. **[Microservicio de Products](https://github.com/emacuello/shop-emaxpeluqueria)**: El microservicio de productos es el encargado de crear, eliminar y modificar los productos para el Ecommerce de la aplicación.
4. **[Microservicio de Emails](https://github.com/emacuello/mailms)**: El microservicio de correos electrónicos es el encargado de enviar emails cuando un usuario se registra, crea un turno, cancela un turno y realiza una compra exitosa.
5. **[Microservicio de AccessTokens](https://github.com/emacuello/apioauthtoken)**: Este microservicio se encarga de la creación del AccessToken necesario para que el microservicio de correos electrónicos funcione correctamente.

## Diagrama

![Diagrama de microservicios](https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/ypf5twyrewahtu3frvbf)

# Microservicio de Auth, Users y Appointments

## Config de Microservicio de Auth, Users y Appointments

Para probar el Microservicio de Auth, Users y Appointments es necesario crear un `.env` en la raíz del proyecto que tengan estos valores:

-   PORT = 1234
-   DB_PASSWORD = 'example'
-   DB_HOST = 'example'
-   DB_USER = 'example'
-   DB_DATBASE = 'example'
-   DB_PORT = 1234
-   SECRET_KEY = 'example'
-   HOST_REDIS = 'example'
-   HEADERS_TOKEN = 123abc **Un token especial para que el uno de los MS pueda procesar solo las peticiones del ApiGateway**

## Descripción

El microservicio está creado en Express.Js con TypeScript. Se encarga de la creacion del usuario, sus credenciales y del crud de los turnos hecho por el usuario, para almacenar los datos se usa PostgreSQL y TypeORM, las tablas tienen relaciones entre ellas. En el registro interno del usuario se usa Bcrypt para encriptar la contraseña, para el inicio de sesión se usa JWT. Se comunica con el Api Gateway mediante peticiones HTTP. El microservicio se aloja en Vercel y su base de datos se aloja en Railway.

# Emax Peluqueria Frontend

## Config de Emax Peluqueria Frontend

Para probar Emax Peluqueria Frontend es necesario crear un `.env` en la raíz del proyecto que tengan estos valores:

-   VITE_BASE_URL= www.google.com **Es la conexion con el Api Gateway**
-   VITE_FORM_URL= www.google.com **Es una url especial en donde se envian los emails, es un backend en nesjs donde recibe y procesa los datos y me llegan los emails a mi correo personal, el repositorio del servidor por el momento lo tengo privado**
-   VITE_HEADERS_KEY= example **Son key values para necesarios para que mi servidor privado que recibe el formulario de contacto pueda procesar la informacion**
-   VITE_HEADERS_VALUE= example **Son key values para necesarios para que mi servidor privado que recibe el formulario de contacto pueda procesar la informacion**

## Descripción

Aplicación construida con React/Vite y Javascript, contiene estado globales haciendo uso de Redux para poder contener la información así evitando peticiones recurrentes al backend, almacena sus tokens en LocalStorage, para los estilos se usó React-Bootstrap, además se usa AOS para algunas animaciones. La aplicacion se está deplegada en Vercel.
