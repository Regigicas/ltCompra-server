"use strict"
const AlergenoModel = require("../modelos/Alergeno");

function obtenerAlergenos(req, res)
{
    AlergenoModel.find({}, function(err, docs)
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

function postAlergeno(req, res)
{
    let texto = req.body.texto;
    let img = req.body.img;
    if (!texto || !img)
    {
        res.sendStatus(422);
        return;
    }

    AlergenoModel.findOne({}).sort('-id').exec(function (err, doc)
    {
        if (err)
        {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        let newId = doc != null ? doc.id + 1 : 0;
        let newAlergeno = new AlergenoModel({
            texto: texto,
            img: img,
            id: newId
        });
    
        newAlergeno.save(function (err, alergeno)
        {
            if (err)
            {
                console.error(err);
                res.sendStatus(500);
            }
            else
                res.status(201).send(alergeno);
        });
    });
}

module.exports =
{
    obtenerAlergenos,
    postAlergeno
};
