// import express from 'express';
//import IndexRoutes from './routes/index';
//import conectarDB from './config/db';
// import mysql from 'mysql2';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

//Creamos el servidor
const app = express();

//Puerto de la App
const port = process.env.PORT || 4000;

//Habilitar los valores de un body
app.use(express.json());

//ejecutamos body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

//Registramos rutas de la app
app.use('/api/v1', routes());


app.listen(port, () => {
    console.log('Server running on port ', port);
});
