"use strict"
const CarritoModel = require("../modelos/Carrito");
const AlimentoModel = require("../modelos/Alimento");

function obtenerListadoCompra(req, res)
{
    CarritoModel.find({}).populate("carrito", "", AlimentoModel).exec(function (err, doc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else
            res.status(200).send(doc);
    });
}

module.exports =
{
    obtenerListadoCompra
};
