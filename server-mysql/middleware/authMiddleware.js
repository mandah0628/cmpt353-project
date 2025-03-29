const verifyToken = require('../utils/verifyToken')

const authMiddleware = (req,res,next) => {
    const header = req.header("Authorization");

    // if there is no token
    if(!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({message: "Access restricted, no token"});
    }

    const token = header.split(" ")[1].trim();

    const decoded = verifyToken(token);

    if(!decoded) {
        return res.status(401).json({message: "Invalid or expired token"});
    }

    req.user = decoded;
    
    next();
}

module.exports = authMiddleware;