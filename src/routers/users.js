const router = require('express').Router();
const {users} = require('../controllers');

router.get('/', users.getDataUsers);

router.post('/add', users.addDataUsers);

router.put('/edit/:id', users.editDataUsers);

router.delete('/delete/:id', users.deleteDataUsers);

module.exports = router;