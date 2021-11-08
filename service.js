// Librerias
const express = require("express");
const path = require("path");
const cors = require("cors");
const { query } = require("express");
let server = express();
var sqlite3 = require('sqlite3').verbose();

// Variables
const ruta_ingreso = "/Datos";
const puerto = 3003
/*
try{
    let db = new sqlite3.Database("database", (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            db.run(`
               CREATE TABLE usuarios (
                    id INTEGER  PRIMARY KEY AUTOINCREMENT,
                    objeto TEXT NOT NULL,
                    fecha TEXT NOT NULL,
                    ubicacion TEXT NOT NULL,
                    usuario TEXT NOT NULL
                );
            `);
        }
    });
    db.close()
}catch(e){

}
*/

server.listen(puerto, function() {
    console.log("ingreso");
});

server.get("/guardar", async (req, res) => {
    console.log( req.query )

    //crear tabla
    let db = new sqlite3.Database("database", (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            db.run("INSERT INTO usuarios (objeto,fecha,ubicacion,usuario) VALUES ( '"+req.query.objeto+"', '"+req.query.fecha+"', '"+req.query.ubicacion+"', '"+req.query.usuarios+"');");
        }
    });
    db.close()

});



server.use(express.static(path.join(__dirname, ruta_ingreso)));
server.use(cors());
server.options("*", cors());