const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajoute les informations du token décodé à l'objet `req` pour une utilisation ultérieure
    req.user = decoded;

    // Passe à la prochaine étape du middleware
    next();
  } catch (err) {
    console.error("Erreur lors de la vérification du token :", err);
    return res.status(401).json({ message: "Token invalide" });
  }
};
