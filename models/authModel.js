const connection = require("../config/db");

const Authentification = {};

Authentification.findByEmail = (email, callback) => {
  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la recherche de l'utilisateur :", err);
        callback(err, null);
        return;
      }
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
    }
  );
};

module.exports = Authentification;