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
const getDataPembeli = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pembeli', function (error, rows)  {
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
        // console.log(error);
        res.send({
            success: false,
            message: error.stack,
        });
    }
}

// menambahkan data
const addDataPembeli = async(req,res) => {
    try{

    let data =  {
        nama_pembeli: req.body.nama_pembeli
    }
    
        const result = await new Promise((resolve,reject) => {
            connection.query('INSERT INTO pembeli SET ?;',[data],function(error,rows){
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
const editDataPembeli = async(req, res) => {
    let kode_pembeli = req.params.kode_pembeli;
    
    let = dataEdit = {
        nama_pembeli: req.body.nama_pembeli
    }

    try{
        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE pembeli SET ? WHERE kode_pembeli = ?;', [dataEdit, kode_pembeli], function(error, rows) {
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
const deleteDataPembeli = async(req, res) => {
    let kode_pembeli = req.params.kode_pembeli;

    try{
        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM pembeli WHERE kode_pembeli = ?;', [kode_pembeli], function(error, rows) {
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
    getDataPembeli,
    addDataPembeli,
    editDataPembeli,
    deleteDataPembeli
}