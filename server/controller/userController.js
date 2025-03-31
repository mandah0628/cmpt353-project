const generateToken = require('../utils/generateToken');
const hashPassword = require('../utils/hashPassword');
const validatePassword = require('../utils/validatePassword');

const { 
    // add db operations
    createUserDb,
    getUser,
  
} = require('../data/userData');


// creates a user and profile photo entries in the db
const createUser = async (req, res) => {
    
    try {
        const { password } = req.body;

        // create a hashed password
        const hashedPassword = hashPassword(password);

        // update the password to a hashed password
        const userData = {...req.body , password: hashedPassword};

        // insert the user ecord into the users table
        const user = await createUserDb(userData);

        // get the newly created user's id to generate a jwt
        const userId = user.insertId

        // 4)generate token
        const token = generateToken(userId);

        // send token back to authenticat user right away
        res.status(201).json({ 
            message : "Account successfully created",
            token
        });

    } catch (error) {
        console.error("Error regstering:", error);
        res.status(500).json({ error : "Server side error"});
    }
};


// logs in a user by the user's email and password
const loginUser = async (req,res) => {
    try {
        // extract data
        const { email, password } = req.body;
        
        // fetch the user from the db
        const user = await getUser(email);

        if(!user) {
            return res.status(404).json({message:"Invalid email or password"});
        }

        // checks if password is correct
        const passwordIsValid = validatePassword(password, user.password);

        // if password is correct
        if(passwordIsValid) {
            const token = generateToken(user.id);
            return res.status(200).json({token});
        }

    } catch (error) {
        console.error("Error loggin in user:", error.message);
        res.status(500).json({messaege : "Server error"});
    }
}


module.exports = {
    createUser, loginUser
}