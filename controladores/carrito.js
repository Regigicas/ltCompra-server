"use strict"
const CarritoModel = require("../modelos/Carrito");
const AlimentoModel = require("../modelos/Alimento");

function obtenerListadoCompra(req, res)
{
    CarritoModel.findOne({}).populate("carrito", "", AlimentoModel).exec(function (err, doc)
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

function comprobarListadoId(req, res)
{
    let id = req.params.id;
    CarritoModel.findOne({}).populate("carrito", "", AlimentoModel).exec(function (err, doc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else
        {
            AlimentoModel.findOne({ codBarras: id }, function (err, aliDoc)
            {
                if (err)
                {
                    console.error(err);
                    res.sendStatus(500);
                }
                else if (!aliDoc)
                    res.sendStatus(404);
                else
                {
                    if (doc.carrito.some(e => e._id.equals(aliDoc._id)))
                    {
                        res.status(200).send(aliDoc);
                        return;
                    }

                    res.sendStatus(404);
                }
            });
        }
    });
}

function postListadoCompra(req, res)
{
    let codBarras = req.body.codBarras;
    if (!codBarras)
    {
        res.sendStatus(422);
        return;
    }

    AlimentoModel.findOne({ codBarras: codBarras }, function (err, aliDoc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else if (!aliDoc)
            res.sendStatus(404);
        else
        {
            CarritoModel.findOne({}, function (err, carrDoc)
            {
                if (err)
                {
                    console.error(err);
                    res.sendStatus(500);
                }
                else if (!carrDoc)
                {
                    let newCarrito = new CarritoModel({
                        carrito: [ aliDoc._id ]
                    });

                    newCarrito.save(function (err, carritoCreado)
                    {
                        if (err)
                        {
                            console.error(err);
                            res.sendStatus(500);
                        }
                        else
                            res.status(201).send(carritoCreado);
                    });
                }
                else
                {
                    if (carrDoc.carrito.indexOf(aliDoc._id) > -1)
                    {
                        res.sendStatus(409);
                        return;
                    }

                    carrDoc.carrito.push(aliDoc._id);
                    carrDoc.save();
                    res.status(201).send(carrDoc);
                }
            });
        }
    });
}

function deleteListadoCompra(req, res)
{
    CarritoModel.deleteOne({}, function (err, doc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else
            res.sendStatus(204);
    });
}

function deleteListadoCompraId(req, res)
{
    let id = req.params.id;
    CarritoModel.findOne({}, function (err, doc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else if (!doc)
            res.sendStatus(404);
        else
        {
            AlimentoModel.findOne({ codBarras: id }, function (err, aliDoc)
            {
                if (err)
                {
                    console.error(err);
                    res.sendStatus(500);
                }
                else if (!aliDoc)
                    res.sendStatus(404);
                else
                {
                    doc.carrito.pull(aliDoc._id);
                    doc.save();
                    res.sendStatus(204);
                }
            });
        }
    });
}

module.exports =
{
    obtenerListadoCompra,
    comprobarListadoId,
    postListadoCompra,
    deleteListadoCompra,
    deleteListadoCompraId
};
