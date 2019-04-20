"use strict"
const express = require("express");
const controladorAlergenos = require("../controladores/alergenos");

let api = express.Router();

api.get("/alergenos", controladorAlergenos.obtenerAlergenos);
api.post("/alergenos", controladorAlergenos.postAlergeno);

module.exports = api;
