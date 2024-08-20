const express = require('express');
const sql = require('mssql');
require('dotenv').config();
const app = express();


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: 'FRODE-LAPTOP\\SQLEXPRESS',
    database: 'users',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}


sql.connect(config, err => {
    if (err) {
        console.error('Database connection failed:', err.message); 
    } else {
        console.log('Connection Successful!');
    }
})

app.get('/', (req, res) => {
    new sql.Request().query("SELECT * FROM users", (err, result) => {
    if (err) {
        res.status(404).send("Could not get database");
        console.log(err);
    } else {
        res.status(200).send(result.recordset);
        console.log(result.recordset);
    }
})
})

app.get('/:id', (req, res) => {
    new sql.Request().query(`SELECT * FROM users WHERE ID = ${req.params.id}`, (err, result) => {
    if (err) {
        res.status(404).send(`Could not find user with id: ${req.params.id}`);
    } else {
        res.status(200).send(result.recordset);
        console.log(result.recordset);
    }
})
})

app.listen(3002);