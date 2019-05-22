"use strict"
const express = require("express");
const controladorAlimentos = require("../controladores/alimentos");

let api = express.Router();

api.get("/alimentos", controladorAlimentos.obtenerAlimentos);
api.get("/alimentos/:id", controladorAlimentos.obtenerAlimento);
api.post("/alimentos", controladorAlimentos.postAlimento);
api.get("/alimentos_nombre", controladorAlimentos.obtenerAlimentoNombre);

module.exports = api;
