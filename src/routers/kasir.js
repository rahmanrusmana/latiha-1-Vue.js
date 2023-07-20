const router = require('express').Router();
const { kasir } = require('../controllers');

router.get('/', kasir.getDataKasir);

router.post('/add', kasir.addDataKasir);

router.put('/edit/:no_kasir', kasir.editDataKasir);

router.delete('/delete/:no_kasir', kasir.deleteDataKasir);

module.exports = router;