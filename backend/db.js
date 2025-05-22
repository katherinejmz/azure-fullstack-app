const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // ex: fullstackserver2025.database.windows.net
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Obligatoire pour Azure
    trustServerCertificate: false,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connexion réussie à Azure SQL');
    return pool;
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à Azure SQL :', err);
  });

module.exports = {
  sql,
  poolPromise,
};
