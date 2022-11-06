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

function hash(input) {
    output = 0;
    for (let i = 0; i < input.length; i++) {
        output += input.charCodeAt(i) * i;
    }
    return output;
}

app.post('/insert/carrito', (req, res) => {
    const user_email = req.body.user_email;
    const id_producto = req.body.id_producto;
    const cantidad = req.body.cantidad;
    const user_id = hash(user_email);

    const sqlInsert = "INSERT INTO carritos (id_producto, id_cliente, cantidad) VALUES (?,?,?);"
    db.query(sqlInsert, [id_producto, user_id, cantidad], (err, result) => {
        console.log(err);
    });
});

app.post('/get/carrito', (req, res) => {
    user_id = hash(req.body.user_email);
    const sqlSelect = "SELECT * FROM carritos JOIN productos on carritos.id_producto = productos.id_producto WHERE id_cliente = ?";
    db.query(sqlSelect, user_id, (err, result) => {
        res.send(result);
    });
});

app.get('/get/productos', (req, res) => {
    const sqlSelect = "SELECT * FROM productos JOIN categorias ON productos.id_categoria = categorias.id_categoria;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get('/get/productosFiltrados/:producto', (req, res) => {
    const producto = req.params.producto;
    const sqlSelect = "SELECT * FROM productos JOIN categorias ON productos.id_categoria = categorias.id_categoria WHERE producto LIKE '%" + producto + "%';";
    db.query(sqlSelect, producto, (err, result) => {
        res.send(result);
    });
});

app.post('/insert/cliente', (req, res) => {
    const user_email = req.body.user_email;
    const user_id = hash(user_email);

    const sqlInsert = "INSERT INTO clientes (id_cliente, correo) VALUES (?,?);"
    db.query(sqlInsert, [user_id, user_email], (err, result) => {
        console.log(err);
    });
});

app.put('/update/carrito', (req, res) => {
    const user_email = req.body.user_email;
    const id_producto = req.body.id_producto;
    const cantidad = req.body.cantidad;
    const id_cliente = hash(user_email);

    const sqlUpdate = "UPDATE carritos SET cantidad = ? WHERE id_producto = ? AND id_cliente = ?";
    db.query(sqlUpdate, [cantidad, id_producto, id_cliente], (err, result) => {
        console.log(err);
    })
});

app.delete('/delete/carrito/:user_email/:id_producto', (req, res) => {
    const user_email = req.params.user_email;
    const id_producto = req.params.id_producto;
    const id_cliente = hash(user_email);

    const sqlDelete = "DELETE FROM carritos WHERE id_producto = ? AND id_cliente = ?";
    db.query(sqlDelete, [id_producto, id_cliente], (err, result) => {
        console.log(err);
    });
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});
