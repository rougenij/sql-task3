const express = require("express");
const dbSingleton = require("../dbSingleton");
const bcrypt = require("bcrypt");

const router = express.Router();

const db = dbSingleton.getConnection();

//GET
//Get all users
router.get("/", (req, res) => {
  const query = "SELECT * from users";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//POST
//Add new user
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  const query = "INSERT INTO users (username,email,password_hash) VALUES(?,?,?";

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  db.query(query, [username, email, hashedPassword], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "User added", id: results.insertId });
  });
});

//User login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * from users where email='${email}'`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const isUser = bcrypt.compareSync(password, results[0].password_hash);
    if (isUser) {
      res.status(200).send("User logged in");
    } else {
      res.send("Incorrect password");
    }
  });
});

//PUT
//Update an exisiting user
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  const query =
    "UPDATE users SET username=?,email=?,password_hash=? WHERE id = ?";

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  db.query(query, [username, email, password, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "User modified" });
  });
});

module.exports = router;
