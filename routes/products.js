const express = require("express");
const dbSingleton = require("../dbSingleton");

const router = express.Router();

const db = dbSingleton.getConnection();

// GET all products.
router.get("/", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// GET product by id.
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products where id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result.length !== 0) res.json(result);
    else res.json({ message: "No product was found with given ID." });
  });
});

// POST add product
router.post("/", (req, res) => {
  const { id, name, price } = req.body;

  if (id !== undefined && name && price !== undefined) {
    const query = "INSERT INTO products (id, name, price) VALUES (?, ?, ?)";
    db.query(query, [id, name, price], (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: "Product added", product: { id, name, price } });
    });
  } else res.json({ message: "Missing parameters." });
});

// PUT update product by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (id !== undefined && name && price !== undefined) {
    const query = "UPDATE products SET name = ?, price = ? WHERE id = ?";
    db.query(query, [name, price, id], (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (result.affectedRows !== 0) res.json({ message: "Product updated." });
      else res.json({ message: "Product with given ID could not be found" });
    });
  } else res.json({ message: "Missing or invalid parameters." });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products where id=?";
  db.query(query, [id], (res, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product deleted" });
  });
});

module.exports = router;
