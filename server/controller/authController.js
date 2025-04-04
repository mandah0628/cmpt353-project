const verifyToken = require('../utils/verifyToken');


// checks if the user's current token is valid
const checkToken = async (req,res) => {
  // 1) extract token
  const token = req.cookies.token;

  // if there is no token
  if(!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    // 2) get decoded token
    const decoded = verifyToken(token);

    if(decoded) {
      res.status(200).send("Ok");      
    }

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = checkToken;