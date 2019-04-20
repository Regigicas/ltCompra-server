"use strict"
const AlimentoModel = require("../modelos/Alimento");
const CategoriaModel = require("../modelos/Categoria");
const AlergenoModel = require("../modelos/Alergeno");

function obtenerAlimentos(req, res)
{
    AlimentoModel.find({})
    .populate("categoria", "", CategoriaModel)
    .populate("alergenos", "", AlergenoModel)
    .exec(function (err, docs)
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

function obtenerAlimento(req, res)
{
    let id = req.params.id;
    AlimentoModel.findOne({ codBarras: id })
    .populate("categoria", "", CategoriaModel)
    .populate("alergenos", "", AlergenoModel)
    .exec(function (err, aliDoc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else
            res.status(200).send(aliDoc);
    });
}

function postAlimento(req, res)
{
    let codBarras = req.body.codBarras;
    let nombreProducto = req.body.nombreProducto;
    let nombreFabricante = req.body.nombreFabricante;
    let imgPath = req.body.imgPath;
    let categoria = req.body.categoria;
    let alergenos = req.body.alergenos ? req.body.alergenos : [];
    if (!codBarras || !nombreProducto || !nombreFabricante || !imgPath || categoria == null)
    {
        res.sendStatus(422);
        return;
    }

    AlimentoModel.findOne({ codBarras: codBarras }, function (err, doc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
        }
        else if (doc)
            res.sendStatus(409);
        else
        {
            CategoriaModel.findOne({ id: categoria }, function (err, catDoc)
            {
                if (err)
                {
                    console.error(err);
                    res.sendStatus(500);
                }
                else if (!catDoc)
                    res.sendStatus(422);
                else
                {
                    AlergenoModel.find().where("id").in(alergenos).exec(function (err, alergDocs)
                    {
                        if (err)
                        {
                            console.error(err);
                            res.sendStatus(500);
                        }
                        else
                        {
                            let alerObjIds = alergDocs.map(a => a._id);
                            let newAli = new AlimentoModel({
                                codBarras: codBarras,
                                nombreProducto: nombreProducto,
                                nombreFabricante: nombreFabricante,
                                imgPath: imgPath,
                                categoria: catDoc._id,
                                alergenos: alerObjIds
                            });

                            newAli.save(function (err, nuevoAlimento)
                            {
                                if (err)
                                {
                                    console.error(err);
                                    res.sendStatus(500);
                                }
                                else
                                    res.status(201).send(nuevoAlimento);
                            });
                        }
                    });
                }
            });
        }
    });
}

module.exports =
{
    obtenerAlimentos,
    obtenerAlimento,
    postAlimento
};
