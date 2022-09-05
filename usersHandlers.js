const { json, application } = require("express");
const database = require("./database");

const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if (req.query.language != null) {
    where.push({
      column: "language",
      value:req.query.language,
      operator: "="
    });
  } 
  if (req.query.city != null) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }


    database
      .query(
        where.reduce(
          (sql, {column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
          initialSql
        ),
        where.map(({ value }) => value)
        )
      .then(([users]) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      }); 
  };
  
  const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrievingdata from database");
      });
  };

  //Route pour le post avec retour des infos de la database :
  const postUsers = (req, res) => {
    const { firstname, lastname, email, city, langage } = req.body;
  
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, langage) VALUES (?,?,?,?,?)",
        [firstname, lastname, email, city, langage]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
      });
  };

  module.exports = {
    getUsers,
    getUsersById,
    postUsers
  };