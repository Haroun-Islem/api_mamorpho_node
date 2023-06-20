// const express = require("express");
let express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/loginRoutes"));


app.use((req, res, next) => {
  res.status(404).json({ message: "Route introuvable" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
