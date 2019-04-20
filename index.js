"use strict"
const server = require("./server");
const port = process.env.port || 8080;
const mongoose = require("mongoose");
const urlServer = "mongodb://127.0.0.1:27017/ltCompra";

mongoose.connect(urlServer, {useNewUrlParser: true}).then(() =>
{
    const servidor = server.listen(port, () =>
    {
        console.log(`Servidor escuchando en ${servidor.address().port}`);
    });
});
