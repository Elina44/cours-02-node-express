//Pour importer le package dotenv
require("dotenv").config();

//on importe le package mysql2 avec le promesse = promise
const mysql = require("mysql2/promise");

//pour préparer la connexion à la base de données=> on fait un pool
const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

/*database
    .getConnection()
    .then(() => {
        console.log("Can reach database");
    })
    .catch((err) => {
        console.error(err);
    });
*/

//Pour écrire une requête :
database
    .query("select * from movies")
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.error(err);
    });
//result est un tableau => pour avoir les résultats
/*database
  .query("select * from movies")
  .then((result) => {
    const movies = result[0];
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });
  */
  /*Ou en destructurant le tableau :
  database
  .query("select * from movies")
  .then(([movies]) => {
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });
  On met cette partie dans la fonctiongetMovies
  dans le fichier movieHandlers.js et on marque l'export
  */
 module.exports = database;
