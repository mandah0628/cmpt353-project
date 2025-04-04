const verifyToken = require('../utils/verifyToken')

const authMiddleware = (req,res,next) => {
  // extract token
  const token = req.cookies.token;
  console.log(token);
  // if there is no token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // decoded jwt
  const decoded = verifyToken(token);
  console.log(decoded);
  
  req.user = decoded;

  // if token is expired
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  next();
}

module.exports = authMiddleware;