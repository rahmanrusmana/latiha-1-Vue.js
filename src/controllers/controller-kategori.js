const config  = require('../configs/database');
const mysql  = require('mysql');
const session = require('express-session');
const express = require('express');
const connection  = mysql.createConnection(config);
connection.connect();

const app = express();
app.use(session({
    secret  : 'mysecret',
    resave  : false,
    saveUninitialized: true
}));

// menampilkan semua data
const getDataKategori = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kategori', function (error, rows)  {
                if (rows) {
                    resolve(rows);
                } else {
                    reject([]);
                }
            });
        });
        if (req.session.loggedin) {
            res.send({
                success: true,
                message: 'Berhasil ambil data!',
                data: data
            });
        } else {
            res.send({
                success: true,
                message: 'Silahkan Login Terlebih Dahulu'
            });
        }
    }
    catch(error) {
        res.send({
            success: false,
            message: error.stack,
        });
    }
}

// menambahkan data
const addDataKategori = async(req,res) => {
    try{

    let data =  {
        kategori: req.body.kategori
    }
    
        const result = await new Promise((resolve,reject) => {
            connection.query('INSERT INTO kategori SET ?;',[data],function(error,rows){
                if (rows) {
                    resolve(true)
                }else {
                    reject(false)
                }
            });
    
        });
    
        
            res.send({
                success: true,
                message: 'Berhasil menambahkan data!'
            });
        
    }
    catch(error) {
        res.send({
            success: false,
            message: 'Gagal menambahkan data!'
        });
    }
}

// mengubah data
const editDataKategori = async(req, res) => {
    let id = req.params.id;
    
    let = dataEdit = {
        kategori: req.body.kategori
    }

    try{
        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE kategori SET ? WHERE id = ?;', [dataEdit, id], function(error, rows) {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    
        
            res.send({
                success: true,
                message: "Berhasil edit data!"
            });
        }
    
    catch(error) {
        res.send({
            success: false,
            message: "Gagal edit data!"
        });
    }
}

// delete data
const deleteDataKategori = async(req, res) => {
    let id = req.params.id;

    try{
        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM kategori WHERE id = ?;', [id], function(error, rows) {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    
        
            res.send({
                success: true,
                message: "Berhasil hapus data!"
            });
        }
    
    catch(error) {
        res.send({
            success: false,
            message: "Gagal hapus data!"
        });
    }
}

module.exports = {
    getDataKategori,
    addDataKategori,
    editDataKategori,
    deleteDataKategori
}