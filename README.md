# REST API
Prueba técnica para la empresa [Endcom](https://endcom.mx/) la cual tiene por objetivo crear una REST API para la simulación de una aplicación financiera.

## Instrucciones para desplegar el proyecto

Deberemos tener instalado [**Node JS**](https://nodejs.org/es/download/) en nuestro equipo.

***

* Una vez que tenemos descargado node, tendremos que clonar/descargar el repositorio.
Lo abrimos con nuestro editor de código favorito, abrimos una terminal en el directorio raíz y escribimos lo siguiente

```javascript
> npm install
```

Esto con el fin de poder instalar todas las dependencias que se utilizaron.

***

* En la misma consola que abrimos anteriormente, debemos correr el siguiente comando 


```javascript
> npm start
```

Para inicializar el server, dicho script se definió en el archivo package.json. El cual tendremos como dependencia nodemon para que nuestro proyecto se refresque cada vez que guardamos cambios

```javascript
"scripts": {
    "start": "nodemon ./index.js"
},
```

***

# Consumir API's

### * Definición de la base de datos

Se optó por crear nuestra base de datos en MySQL y como ORM [Sequelize](https://sequelize.org/) para poder establecer conexión e interactuar con la base de datos
```javascript
module.exports = new Sequelize('endcombankapp', 'user', 'password', {
    host: 'localhost',
    port: '8889',
    dialect: 'mysql',
    define:{
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: 1
})
```
***

### * **EndPoint 1 Crear Cuenta de Usuario**

En este endpoint con método **POST** tiene por objetivo crear una cuenta para el usuario el cual primero se definió un modelo de datos a seguir.
Dicho endpoint tiene como URL [/create-account] éste recibirá dos parametros enviados en el request con el siguiente formato
```javascript
{
  "name" : "Nombre completo" ,
  "mail" : "mail@endcom.mx"
}
```
Se recibira dicha información y se hara una petición post, donde conforme al modelo de datos se llenará el registro en nuestra Base de Datos

***

### * **EndPoint 2 Agregar saldo a la cuenta**

Con dicho endpoint podremos agregar saldo a la cuenta que previamente se tuvo que haber creado. Este endpoint tiene como método **PUT** el nos permite agregar saldo a nuestra cuenta; Tendra como URL [/account]. Las parametros necesarios seran enviados por el **_request.body_** donde se tendrá que especificar a que cuenta será agregdado dicho saldo

```javascript
{
  "account" : "86646692001" ,
  "balance" : 500
}
```

con estos parámetros se buscará en base de datos y se añadirá el saldo definido en el request

***

### * **EndPoint 3 Consultar cuenta**

Se tiene por objetivo consultar toda la información de una cuenta (id, No. cuenta, balance, nombre, email) a partir de que se nos proporcione dicha cuenta, para esto se debe enviar por parametros de la URL dicha cuenta [/account/:**_account_**]. Esta cuenta se recibe en el back y se hace la busqueda en la base de datos.
Se tiene como resultado toda la info de la cuenta
```javascript
{
  "statusCode" : 200 ,
  "message" : "Información de cuenta" ,
  "id" : "Identificador" ,
  "account" : "86646692001" ,
  "balance" : 1500 ,
  "name" : "Nombre Completo" ,
  "mail" : "mail@endcom.mx"
}
```

***

### * **EndPoint 4 Crear movimiento de usuario**

Se define un modelo para los movimentos, algunos campos tendrán valores predefinidos y otros no;
Al revisar si existe una cuenta en la tabla de usuarios; si existe un match se deberá hacer una actualización del balance conforme a la cantidad que se le esta enviando. 
```javascript
{
  "account" : 86646692001 ,
  "amount" : 50,
  "description" : " mail@endcom.mx "
}
```
Este cantidad primero se debe verifciar si es que el usuario tiene saldo suficiente para poder hacer la operación; en casi de que si tenga crédito disponible se debe efectuar la operación, actualizar el credito del usuario y generar un movimiento en la tabla de movimientos.
En caso contrario de que no haya saldo suficiente se debera regresar un error.

***

### * **EndPoint 5 Actualizar movimiento de usuario**

Este endpoint tendrá como URL [/account/movement] las cual recibe dos parámetros de información 

```javascript
{
  "id" : ID_MOVIMIENTO_EXISTENTE ,
  "movementCode" : "M002",
}
```

Como parte de la prueba se debió tener un web service el cual tuviera un catálogo de movimientos. Dicho service no era el indicado a lo cual opté por crear un servicio fake; Definí un archivo llamado _movimiento.json_ donde está almacenado dicho catálogo; Para poder hacer la simulación de que se estaba consumiendo un servicio externo instale la depedencia 

```javascript
> npm json-server
```
El cual me permitió crear este servicio provicional; para poder levantar este servicio escribir la siguiente línea de código
```javascript
> json-server --watch movimientos.json
```
Una vez arriba este server podremos comparar el código que se nos esta enviando con el que está dentro del catálogo de movimientos y asi poder actualizar el tipo de movimiento 

***

### * **EndPoint 6 Consultar movimientos por cuenta**

Tendremos por URL [/account/movements/:**_account_**] el cual tiene por objetivo listar todos los movimientos que tiene la cuenta en cuestrión y cual será la cuenta en cuestión; la que se nos estará enviando por parámetros en la URL
Debemos dar como respuesta el un mensaje la cuenta que se pidió y todo un listado de los movimientos que tendrá esa cuenta registrada actualmente.
```javascript
{
    "statusCode": 200,
    "message": "Movimientos de cuenta",
    "account": "5982348300n",
    "movements": [
        {
            "id": 1,
            "movementCode": "M001",
            "description": "Movimiento",
            "amount": 10,
            "account": "59823483001",
            "createDate": "2021-01-18"
        }
    ]
}
```
