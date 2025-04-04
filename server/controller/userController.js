const generateToken = require('../utils/generateToken');
const hashPassword = require('../utils/hashPassword');
const validatePassword = require('../utils/validatePassword');

const { 
    // add db operations
    createUserDb,
    getUserByEmail,
    getUserByIdDb
  
} = require('../data/userData');


// creates a user and profile photo entries in the db
const createUser = async (req, res) => {
    
    try {
        const { password } = req.body;

        // create a hashed password
        const hashedPassword = await hashPassword(password);

        // update the password to a hashed password
        const userData = {...req.body , password: hashedPassword};

        // insert the user ecord into the users table
        const user = await createUserDb(userData);

        // get the newly created user's id to generate a jwt
        const userId = user.insertId

        // 4)generate token
        const token = generateToken(userId);

        // send token back to authenticate user right away
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 3600000
        });

        res.status(201).send("ok"); 

    } catch (error) {
        console.error("Error registering:", error);
        res.status(500).json({ error : "Server side error"});
    }
};


// logs in a user by the user's email and password
const loginUser = async (req,res) => {
    try {
        // extract data
        const { email, password } = req.body;
    
        
        // 1) check if user exists by email
        const user = await getUserByEmail(email);
        
        // no user found
        if(!user) {
            return res.status(404).json({message:"Invalid email or password"});
        }

        // 2) check if password is correct
        const passwordIsValid = await validatePassword(password, user.password);

        // incorrect password
        if(!passwordIsValid) {
            return res.status(401).json({ message:"Invalid email or password"});
        }

        // 3) if all is good

        const token = generateToken(user.id);
        
            
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 3600000
        });

        res.status(200).send("ok");  

    } catch (error) {
        console.error("Error logging in user:", error.message);
        res.status(500).json({messaege : "Server error"});
    }
}



// logs user out
const logoutUser = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}



// get user data by the user's id
const getUserById = async (req,res) => {
    try {
        const userId = req.user.id;

        const user = await getUserByIdDb(userId);

        const {password,createdAt, ...userData} = user;

        // encode image so its ready to be displayed right away on the client
        if(userData.image) {
            const base64Image = Buffer.from(user.image).toString("base64");
            userData.image = `data:${user.imageMimeType};base64,${base64Image}`;
        } else {
            userData.image = null;
        }

        res.status(200).json({userData});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error fetching user data"});
    }
}



// update user info
const updateUser = async (req,res) => {
    try {
        // extract new image file
        const newImage = req.file;
        const

        let imageBuffer, imageMimeType;
        // if there is a new image file
        if (newImage) {
            imageBuffer = newImage.buffer;
            imageMimeType = newImage.mimetype;
            userData = {...req.body, image : imageBuffer, imageMimeType}
        }

        await updateUse

        res.status(200).send



    } catch (error) {
        console.error(error);
        res.status(500).json({});
    }
}


module.exports = {
    createUser, loginUser, logoutUser, getUserById
}