const mysql = require('mysql');

const db = mysql.createConnection({

    host: 'localhost',
    user: 'gcaceres',
    password: 'gcaceres',
    database: 'tp_final'

});

db.connect();

console.log("La conexion a la base de datos fue exitosa");

module.exports = db;