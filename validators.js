//Avec express-validator :
const { body, validationResult } = require('express-validator');
/*=> on doit importer le middleware => npm install --save express-validator
On créé des validateurs sous la forme de tableaux :
*/

const validateUser = [
    body("email").isEmail(),
    body("firstname").isLength({ max: 255 }),
    body("lastname").isLength({ max: 255}),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array() });
        } else {
            next();
        }
    },
];

const validateMovie = [
    body("title").isLength({ max: 255}),
    body("director").isLength({ max: 255 }),
    body("year").isLength({ max: 255 }),
    body("color").isLength({ max: 255 }),
    body("duration").isNumeric({ max: 4 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array() });
        } else {
            next();
        }
    }
];

module.exports = {
    validateUser,
    validateMovie
};



/*
Cours

//Pour que les données soient bien rentrées, on peut mettre une sécurité on précise que pour chaque données, on veut une valeur 
//=> voir la base de données avec NOT NULL.
//Sécurité mise une par une à la main : mais si erreur à la 1ere ligne, le code s'aarête alors que les autres champs peuvent être bien remplis
const validateMovie = (req, res, next) => {
    const { title } = req.body;

    if (title ===null) {
        res.status(422).send("The field 'title' is required");
    } else if (director == null){
        res.status(422).send("The field 'director' is required");
    } else if (year == null) {
        res.status(422).send("The field 'year' is required");
    } else if (color == null) {
        res.status(422).send("The field 'color' is required");
    } else if (duration == null) {
        res.status(422).send("The field 'duration' is required");
    } else {
        next();
    }
};

//Modif du code pour prendre en compte tous les champs et faire ressortir que celui qui est manquant ou mal écrit :
//On créé un tableau d'erreurs
const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];
  
    if (title == null) {
      errors.push({ field: "title", message: "This field is required" });
    }
    if (director == null) {
      errors.push({ field: "director", message: "This field is required" });
    }
    if (year == null) {
      errors.push({ field: "year", message: "This field is required" });
    }
    if (color == null) {
      errors.push({ field: "color", message: "This field is required" });
    }
    if (duration == null) {
      errors.push({ field: "duration", message: "This field is required" });
    }
   
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };

//Pour vérifier le nbre de caractères sur le titre par exemple, vu qu'on a un tableau =>.length
const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];
  
    if (title == null) {
      errors.push({ field: "title", message: "This field is required" });
    } else if (title.length >= 255) {
      errors.push({ field: "title", message: "Should contain less than 255 characters" });
    }
  
    // ...
  
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };

  //Un email introuvable : voir la quête sur les regex !!!
  const validateUser = (req, res, next) => {
    const { email } = req.body;
    const errors = [];
  
    // ...
  
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Invalid email' });
    }
  
    // ...
  
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };
*/


