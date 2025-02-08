import express from "express";
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

const categoriesRouter = express.Router()

categoriesRouter.post('/createCategory', (req, res) => {
    let nameVal = req.body.categoryName;

    if(nameVal !== '')
    {
        let sql = "INSERT INTO categories (name) VALUES(?)";

        connection.query(sql, [nameVal], (err, results) => 
        {
            if(results && results.affectedRows > 0)
            {
                res.json({status:'success'})
            }
        }) 
    }
})

categoriesRouter.post('/getCategories', (req, res) => {
    let sql = "SELECT id, name FROM categories ORDER BY name";

    connection.query(sql, (err, results) => {
        if(results)
        {
            res.json(results)
        }
    })
})

categoriesRouter.post('/editCategory', (req, res) => {
    let {id, categoryName} = req.body;

    let sql = 'UPDATE categories SET name = ? WHERE id = ? ';

    connection.query(sql, [categoryName, id], (err, results) => {
        if(results.affectedRows > 0)
        {
            res.json({status:'success'})
        }
    }) 
})

categoriesRouter.delete('/deleteCategory', (req, res) => {
    let categoryId = req.body.categoryid;
    
    let deleteSql = 'DELETE FROM categories WHERE id = ? ';
    
    connection.query(deleteSql, [categoryId], (err, results) => {
        if(results.affectedRows > 0)
        {
            res.json({status:'success'})
        }
    })
})

export default categoriesRouter;