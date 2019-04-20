"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const alergenos = require("./routes/alergenos");
const alimentos = require("./routes/alimentos");
const carrito = require("./routes/carrito");
const categorias = require("./routes/categorias");

app.use(function(req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", alergenos);
app.use("/api", alimentos);
app.use("/api", carrito);
app.use("/api", categorias);

module.exports = app;
