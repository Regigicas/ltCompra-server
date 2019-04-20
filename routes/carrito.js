"use strict"
const express = require("express");
const controladorCarrito = require("../controladores/carrito");

let api = express.Router();

api.get("/carrito", controladorCarrito.obtenerListadoCompra);

module.exports = api;
