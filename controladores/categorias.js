"use strict"
const CategoriaModel = require("../modelos/Categoria");

function obtenerCategorias(req, res)
{
    CategoriaModel.find({}, function (err, docs)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else
            res.status(200).send(docs);
    });
}

function obtenerCategoria(req, res)
{
    let id = req.params.id;
    CategoriaModel.findOne({ codBarras: id }, function (err, catDoc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else
            res.status(200).send(catDoc);
    });
}

function postCategoria(req, res)
{
    let nombre = req.body.nombre;
    if (!nombre)
    {
        res.sendStatus(422);
        return;
    }

    CategoriaModel.findOne({}).sort('-id').exec(function (err, doc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        let newId = doc != null ? doc.id + 1 : 0;
        let newCat = new CategoriaModel({
            nombre: nombre,
            id: newId
        });
    
        newCat.save(function (err, categoria)
        {
            if (err)
            {
                console.error(err);
                res.sendStatus(500);
            }
            else
                res.status(201).send(categoria);
        });
    });
}

module.exports =
{
    obtenerCategorias,
    obtenerCategoria,
    postCategoria
};
