const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token not provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
