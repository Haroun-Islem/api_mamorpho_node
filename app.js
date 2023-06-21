// const express = require("express");
let express = require("express");
let cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/loginRoutes"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Route introuvable" });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  next();
});
// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
