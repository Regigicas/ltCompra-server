const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlimentoModel = new Schema(
{
    codBarras: Number,
    nombreProducto: String,
    nombreFabricante: String,
    imgPath: String,
    categoria: Schema.ObjectId,
    alergenos: [Schema.ObjectId]
});

module.exports = mongoose.model("alimento", AlimentoModel);
