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
const getDataKasir = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kasir', function (error, rows)  {
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
                message: 'Silahkan Login Terlebih Dahulu',
                
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
const addDataKasir = async(req,res) => {
    try{

    let data =  {
        nama_kasir: req.body.nama_kasir,
        jenis_kelamin: req.body.jenis_kelamin
    }
    
        const result = await new Promise((resolve,reject) => {
            connection.query('INSERT INTO kasir SET ?;',[data],function(error,rows){
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
const editDataKasir = async(req, res) => {
    let no_kasir = req.params.no_kasir;
    
    let = dataEdit = {
        nama_kasir: req.body.nama_kasir,
        jenis_kelamin: req.body.jenis_kelamin
    }

    try{
        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE kasir SET ? WHERE no_kasir = ?;', [dataEdit, no_kasir], function(error, rows) {
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
const deleteDataKasir = async(req, res) => {
    let no_kasir = req.params.no_kasir;

    try{
        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM kasir WHERE no_kasir = ?;', [no_kasir], function(error, rows) {
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
    getDataKasir,
    addDataKasir,
    editDataKasir,
    deleteDataKasir
}