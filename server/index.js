const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'abasto_db',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get/productos', (req, res) => {
    const sqlSelect = "SELECT * FROM productos";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.get('/get/productosFiltrados/:producto', (req, res) => {
    const producto = req.params.producto;
    const sqlSelect = "SELECT * FROM productos WHERE producto LIKE '%" + producto + "%'";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.listen(3001, () => {
    console.log("Listening on port 3001");
});