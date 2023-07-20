const router = require('express').Router();
const { kategori } = require('../controllers');

router.get('/', kategori.getDataKategori);

router.post('/add', kategori.addDataKategori);

router.put('/edit/:id', kategori.editDataKategori);

router.delete('/delete/:id', kategori.deleteDataKategori);

module.exports = router;