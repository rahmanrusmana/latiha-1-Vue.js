const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express =require('express')
const connection = mysql.createConnection(config);
connection.connect();

const app = express()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// menampilkan semua data
const getDataUsers = async (req,res) => {

    try{
        const data = await new Promise ((resolve, reject) => {
            connection.query('SELECT * FROM users', function (error, rows){
                if (rows) {
                    resolve(rows);
                } else {
                    reject (error);
                }
            });
    });
    if(req.session.loggedin){
        res.send({
            succes: true,
            message: 'Berhasil ambil data!',
            data: data
        });
    } else{
        res.send({
            succes: true,
            message: 'Silahkan Login Terlebih Dahulu',
        });
    }

} catch (error){
    res.send({
        succes: false,
        message: error.stack,

    });
}
}

// menambahkan data
const addDataUsers = async (req,res) => {
  try{
        let data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: req.body.password
        }
    
        const result = await new Promise((resolve,reject) => {
            connection.query('INSERT INTO users SET ?;',[data],function (error,rows){
                if(rows){
                    resolve(true);
                }else {
                    reject(false);
                }
            });
        });
    
            res.send({
                succes: true,
                message: 'Berhasil menambahkan data!'
            });
    } catch(error){
      res.send({
            succes: false,
            message: error.stack
    
        });
    }
}

// mengubah data
  const editDataUsers = async (req, res) => {
    let id = req.params.id;
    let dataEdit = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    }

    const result = await new Promise((resolve, reject) =>{
      connection.query('UPDATE users SET ? WHERE id = ?;', [dataEdit, id], function(error, rows) {
        if (rows) {
          resolve(true);
        } else {
          reject(false);
        }
      });
  });

  if (result) {
    res.send({
      success: true,
      message: 'Berhasilmengedit data',
    });
  } else {
    res.send({
      success: false,
      message: 'Gagalmengedit data',
    });
  }
};

// delete barang
const deleteDataUsers = async (req,res) => {
  try{
      let id = req.params.id;
       
        const result = await new Promise((resolve,reject) => {
            connection.query('DELETE FROM users WHERE id = ?;', [id], function (error,rows){
                if(rows){
                    resolve(true);
                }else {
                    reject(false);
                }
            });
        });
    
        if(result){
            res.send({
                succes: true,
                message: 'Berhasil hapus data!'
            });
    
        }
    } catch(error){
       res.send({
              succes: false,
              message: error.stack,
      
          });
    }
}
  
module.exports = {
  getDataUsers,
  addDataUsers,
  editDataUsers,
  deleteDataUsers
}