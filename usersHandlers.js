const { json, application } = require("express");
const database = require("./database");

const getUsers = (req, res) => {
    database
      .query("select * from users")
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