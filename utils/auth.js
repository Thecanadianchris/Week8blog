const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "2h";




const signToken = (user) => {
  const payload = { id: user.id, username: user.username };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};




const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    res.status(401).json({ message: "You must be logged in to do that" });
    return;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};




module.exports = { signToken, authMiddleware };