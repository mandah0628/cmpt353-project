const verifyToken = require('../utils/verifyToken')

const authMiddleware = (req,res,next) => {
  // extract token
  const token = req.cookies.token;
  
  // if there is no token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // decoded jwt
  const decoded = verifyToken(token);
  
  // attach the decoded user info in the request
  req.user = decoded;

  // if token is expired
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  next();
}

module.exports = authMiddleware;