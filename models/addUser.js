const connection = require("../config/db");
const bcrypt = require("bcrypt");

const User = {};

User.create = (user, result) => {
  // Vérifier si l'email existe déjà
  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [user.email],
    (err, res) => {
      if (err) {
        console.error(
          "Erreur lors de la recherche de l'utilisateur existant :",
          err
        );
        result(err, null);
        return;
      }

      if (res.length > 0) {
        // L'email existe déjà, renvoyer une erreur ou un message indiquant que l'utilisateur existe déjà
        result("L'utilisateur existe déjà", null);
        return;
      }

      // L'email n'existe pas, procéder à l'insertion de l'utilisateur
      // Hasher le mot de passe avant de l'insérer dans la base de données
      const hashedPassword = bcrypt.hashSync(user.password, 10);

      // Insérer l'utilisateur avec le mot de passe hashé
      connection.query(
        "INSERT INTO user (first_name, name, email, password) VALUES (?, ?, ?, ?)",
        [user.first_name, user.name, user.email, hashedPassword],
        (err, res) => {
          if (err) {
            console.error("Erreur lors de la création de l'utilisateur :", err);
            result(err, null);
            return;
          }
          console.log("Utilisateur créé avec succès");
          result(null, { id: res.insertId, ...user });
        }
      );
    }
  );
};

module.exports = User;
