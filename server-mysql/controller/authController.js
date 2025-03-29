const verifyToken = require('../utils/verifyToken');


// checks if the user's current token is valid
const checkToken = async (req,res) => {
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

    res.status(200);
}

module.exports = checkToken;