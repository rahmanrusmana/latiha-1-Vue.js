const router = require('express').Router();
const { pesanan } = require('../controllers');

router.get('/', pesanan.getDataPesanan);

router.post('/add', pesanan.addDataPesanan);

router.put('/edit/:kode_pesanan', pesanan.editDataPesanan);

router.delete('/delete/:kode_pesanan', pesanan.deleteDataPesanan);

module.exports = router;