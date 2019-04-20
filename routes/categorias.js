"use strict"
const express = require("express");
const controladorCategorias = require("../controladores/categorias");

let api = express.Router();

api.get("/categorias", controladorCategorias.obtenerCategorias);
api.get("/categorias/:id", controladorCategorias.obtenerCategoria);
api.post("/categorias", controladorCategorias.postCategoria);

module.exports = api;
