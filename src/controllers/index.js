const users = require('./controllers-users');
const kategori = require('./controller-kategori');
const kasir = require('./controller-kasir');
const pembeli = require('./controller-pembeli');
const pesanan = require('./controller-pesanan');

module.exports = {
    users,
    kategori,
    kasir,
    pembeli,
    pesanan
};