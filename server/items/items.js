import express, { query } from 'express';
import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect()

const itemsRouter = express.Router()

itemsRouter.post('/itemCreate', (req, res) => {
    const {name, nos, id, category} = req.body;

    let itemCreate = "INSERT INTO items(name, nos, category) VALUES(?, ?, ?)";

    connection.query(itemCreate, [name, nos, category], (err, results) => {
        if(results && results.affectedRows > 0)
        {
            res.json({status:'success'})
        }
    })
})

itemsRouter.post('/getItems', (req, res) => {
    console.log(req.session)
    let getItems = "SELECT i.id, i.name, i.nos, c.name as categoryname, c.id as categoryid FROM items i LEFT JOIN categories c ON c.id = i.category ORDER BY c.name, i.name ASC";

    connection.query(getItems, (err, results) => {
        if(results)
        {
            res.json(results)
        }
    })
})

itemsRouter.post('/itemEdit/:id', (req, res) => {
    const {name, nos, category} = req.body;
    let id = req.params.id;

    let editItems = `UPDATE items SET name=?, nos=?, category=? WHERE id = ?`;

    connection.query(editItems, [name, nos, category, id], (err, results) => {
        if(results && results.affectedRows > 0)
        {
            res.json({status:'success'})
        }
    })
})

itemsRouter.delete('/deleteItem/:id', (req, res) => {
    let id = req.params.id;

    let deleteItem = `DELETE FROM items WHERE id=?`;

    connection.query(deleteItem, [id], (err, results) => {
        if(results && results.affectedRows > 0)
        {
            res.json({status:'success'})
        }
    })
})


export default itemsRouter