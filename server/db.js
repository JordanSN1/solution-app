const mysql = require('mysql2');

// Création d'un pool de connexions à la base de données
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // mot de passe vide comme demandé
  database: 'solution',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exporter la version promise du pool pour utiliser async/await
const promisePool = pool.promise();

module.exports = {
  pool: promisePool
}; 