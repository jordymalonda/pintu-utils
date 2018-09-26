const Sequelize = require('sequelize');
const db = require('../configs/database');

const Mutasi = db.define('mutasibcabisnis', {
  NoUrut: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
  NoRekening: Sequelize.STRING,
  TanggalBCA: Sequelize.STRING,
  Keterangan: Sequelize.STRING,
  Cabang: Sequelize.STRING,
  Amount: Sequelize.INTEGER,
  DBCR: Sequelize.STRING,
  SaldoAkhir: Sequelize.INTEGER,
  TanggalTarikan: Sequelize.DATE,
  NamaRekeningTransfer: Sequelize.STRING,
  NoTiket: Sequelize.STRING
}, {
  tableName: 'mutasibcabisnis',
  timestamps: false
});

module.exports = Mutasi;
