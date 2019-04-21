"use strict"
const express = require("express");
const controladorCarrito = require("../controladores/carrito");

let api = express.Router();

api.get("/carrito", controladorCarrito.obtenerListadoCompra);
api.get("/carrito/:id", controladorCarrito.comprobarListadoId);
api.post("/carrito", controladorCarrito.postListadoCompra);
api.delete("/carrito", controladorCarrito.deleteListadoCompra);
api.delete("/carrito/:id", controladorCarrito.deleteListadoCompraId);

module.exports = api;
