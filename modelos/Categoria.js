const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriaModel = new Schema(
{
    id: Number,
    nombre: String
});

module.exports = mongoose.model("categoria", CategoriaModel);
