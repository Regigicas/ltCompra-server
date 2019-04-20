const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarritoModel = new Schema(
{
    carrito: [Schema.ObjectId]
});

module.exports = mongoose.model("carrito", CarritoModel);
