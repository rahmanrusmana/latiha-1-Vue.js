const router = require('express').Router();
const { pembeli } = require('../controllers');

router.get('/', pembeli.getDataPembeli);

router.post('/add', pembeli.addDataPembeli);

router.put('/edit/:kode_pembeli', pembeli.editDataPembeli);

router.delete('/delete/:kode_pembeli', pembeli.deleteDataPembeli);

module.exports = router;