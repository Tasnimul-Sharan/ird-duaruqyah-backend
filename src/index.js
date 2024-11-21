import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

const app = express();
const PORT = 5000;

app.use(cors());

const db = new sqlite.Database("dua_main.sqlite");

app.get("/category", (req, res) => {
  db.all("SELECT * FROM category", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

app.get("/sub_category", (req, res) => {
  const categoryId = req.params.categoryId;
  db.all("SELECT * FROM sub_category", categoryId, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

app.get("/dua", (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  db.all("SELECT * FROM dua ", subcategoryId, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});          

export default app;
