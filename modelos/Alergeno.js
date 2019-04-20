const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlergenoModel = new Schema(
{
    id: Number,
    texto: String,
    img: String
});

module.exports = mongoose.model("alergeno", AlergenoModel);
