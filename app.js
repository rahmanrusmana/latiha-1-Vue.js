const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const session = require('express-session');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uas-rahman'
})

//definisi enviroment secara global (.env)
require('dotenv').config();

//session
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false} 
}));

//convert data ke json
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//memanggil route 
const appRoute = require('./src/routers');
app.use('/', appRoute);

app.post('/login', function(req, res){

    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        
        connection.query('SELECT * FROM users WHERE username = ? and password = ?', [username,password], function(error, result,fields) {
            
            if (error) throw error;

            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                req.session.password = password;

                res.send({
                    success: true,
                    massage: 'Login Berhasil !'
                });
            } else {
                res.send({
                    success: false,
                    massage: 'Login gagal !'
                });
            };
            res.end();
        });
    } else{
        res.send({
            success: true,
            massage: 'Please enter Username and Password!'
        });
        res.end();
    }
});

//menjalankan server sesuai dengan port yg terdaftar di .env (8080)
app.listen(process.env.APP_PORT,()=>{
    console.log(`Server berjalan http://localhost:${process.env.APP_PORT}`);
});