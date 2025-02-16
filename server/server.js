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
import session from 'express-session'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

dotenv.config();

const port = process.env.PORT || 5000

const app = express();

app.use(session({
    secret: 'your-secret-key',  // Secret key to sign the session ID cookie
    resave: true,              // Forces the session to be saved back to the store if unmodified
    saveUninitialized: false,   // Don't create session until something is stored
    cookie: {
      httpOnly: true,           // Make the cookie inaccessible to JavaScript
      secure: false,            // Set to true if using https
      maxAge: 3600000,           // Cookie expiry time (1 hour in this case)
      sameSite: 'Strict'
    }
}));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect()

app.use(cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST', 'DELETE'],
    credentials: true,
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    const sql = 'SELECT id, email as emailDb, COUNT(*) AS userexists, password as passwordDb, firstname, lastname FROM users WHERE email=? GROUP BY id, password';

    connection.query(sql, [email], (err, results) => {

        if(results.length > 0)
        {
            const {id, emailDb, passwordDb, firstname, lastname} = results[0];

            if(bcryptjs.compareSync(password, passwordDb))
            {
                console.log(req.session)
                req.session.userid = id;
                req.session.email = emailDb;
                req.session.firstname = firstname;
                req.session.lastname = lastname;
    
                let lastLoginSql = 'UPDATE users SET lastlogin = ? WHERE id = ?';

                connection.query(lastLoginSql, [Math.round(Date.now() / 1000), id], (err, results) => {})

                res.json({dataVal : 'success', id: id, firstname: firstname, lastname: lastname})
            }
            else
            {
                return res.json({dataVal : 'Incorrect username or password'})
            }
        }
        else
        {
            res.json({dataVal : 'User doesnot exist'})
        }

        if(err) res.json({err : 'Something went wrong!'})
    })
})

app.get('/loggedin', (req, res) => {
    if(req.session.email)
    {
        res.send({loggedIn: true, admin:true, userid:req.session.userid, email: req.session.email, firstname: req.session.firstname, lastname: req.session.lastname})
    }
    else
    {
        res.send({loggedIn: false})
    }
})

app.post('/logout', (req, res) => {
    if(req.session.email)
    {
        req.session.destroy((err) => {
            if(err)
            {
                res.status(500).send('Could not log out');
            }
            else
            {
                res.clearCookie('connect.sid', { path: '/' });
                res.json({loggedout: true})
            }
        })
    }
})

app.use('/', categoriesRouter)
app.use('/', itemsRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
