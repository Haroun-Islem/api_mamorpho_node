const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Authentification = require("../models/authModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherche l'utilisateur dans la base de données par son email
    Authentification.findByEmail(email, (err, authentification) => {
      if (err) {
        console.error("Erreur lors de la recherche de l'utilisateur :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (!authentification) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Vérifie le mot de passe
      const passwordMatch = bcrypt.compareSync(
        password,
        authentification.password
      );

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Génère un token JWT
      const token = jwt.sign(
        { id: authentification.id, email: authentification.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Renvoie le token dans la réponse
      return res.status(200).json({ token });
    });
  } catch (err) {
    console.error("Erreur lors de l'authentification :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
