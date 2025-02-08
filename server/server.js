// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql2')
// const bcryptjs = require('bcryptjs');
// const path = require('path')

import express from "express"
import cors from "cors"
import mysql from "mysql"
import bcryptjs from "bcryptjs"
import path from "path"
import categoriesRouter from "./categories/categories.js"
import itemsRouter from "./items/items.js"
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000

const app = express();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect()

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from Node.js!!" });
});

app.post('/createUser', (req, res) => {
    let reqBody = req.body.value;

    reqBody.password = bcryptjs.hashSync(reqBody.password, 10);

    const params = [reqBody.firstname, reqBody.lastname, reqBody.email, reqBody.branch, reqBody.password];

    connection.query('SELECT COUNT(*) as count FROM users WHERE email = ?', reqBody.email, (err, results) => {
        let count = results[0].count;

        if(count == 0)
        {
            connection.query('INSERT INTO users (firstname, lastname, email, branch, password) VALUES (?, ?, ?, ?, ?)', params, (err, results) => {
                if(err)
                {
                    console.log(err)
                    res.json({responseVal: 'Something went wrong! Cannot create user'})
                }
                else
                {
                    res.json({responseVal: 'User created successfully', errorVal: err})
                }
            })
        }
        else
        {
            res.json({responseVal: 'Email already exists!'})
        }
    })
});

app.post('/verifyUser', (req, res) => {
    const {email, password} = req.body.value;
    const sql = 'SELECT id, COUNT(*) AS userexists, password as passwordDb, firstname, lastname FROM users WHERE email=? GROUP BY id, password';
    connection.query(sql, [email], (err, results) => {

        if(results.length > 0)
        {
            const {id, passwordDb, firstname, lastname} = results[0];

            (bcryptjs.compareSync(password, passwordDb)) ? res.json({dataVal : 'success', id: id, firstname: firstname, lastname: lastname}): res.json({dataVal : 'Incorrect username or password'})
        }
        else
        {
            res.json({dataVal : 'Incorrect username or password'})
        }

        if(err) res.json({err : 'Something went wrong!'})
    })
})

app.use('/', categoriesRouter)
app.use('/', itemsRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
