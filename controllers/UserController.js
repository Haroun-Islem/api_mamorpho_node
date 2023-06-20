const User = require("../models/addUser");

exports.createUser = (req, res) => {
  const { first_name, name, email, password } = req.body;

  const newUser = {
    first_name,
    name,
    email,
    password,
  };

  User.create(newUser, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  });
};
