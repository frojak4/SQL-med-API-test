const express = require('express');
const sql = require('mssql');

const app = express();


const config = {
    user: '',
    password: '',
    server: 'localhost\\SQLEXPRESS',
    database: 'BOOKS',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
}

sql.connect(config, err => {
    if (err) {
        console.error('Database connection failed:', err.message); 
    } else {
        console.log('Connection Successful!');
    }
})

app.get('/', (req, res) => {
    new sql.Request().query("SELECT * FROM books", (err, result))
    if (err) {
        res.status(404).send("Could not get database");
    } else {
        res.status(200).send(result);
    }
})

app.get('/:id', (req, res) => {
    new sql.Request().query(`SELECT * FROM books WHERE ID = ${req.params.id}`, (err, result));
    if (err) {
        res.status(404).send(`Could not find book with id: ${req.params.id}`);
    } else {
        res.status(200).send(result);
    }
})