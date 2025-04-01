require('dotenv').config();
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

// create express instance
const app = express();

// define port
const PORT = process.env.PORT || 8080;

// route imports
const channelRoute = require('./routes/channelRoute.js')
const userRoute = require('./routes/userRoute.js')
const authRoute = require('./routes/authRoute.js')
const postRoute = require('./routes/postRoute.js')


// define main routes
app.use("/channel", channelRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);


// allows server to parses cookies
app.use(cookieParser());

// allows server to parse json request bodies
app.use(express.json(
    {
        limit: "5mb",
        type:"application/json"
    }
));

// allows requests from the frontend with cookies
app.use(cors(
    {
        origin: "http://react:5173",
        credentials: true
    }
));


// mysql db connection
const mysqlPool = require('./config/mysql.js');
(async () => {
    try {
      const connection = await mysqlPool.getConnection();
      console.log('✅ MySQL connected');
      connection.release();
    } catch (err) {
      console.error('❌ MySQL connection error:', err.message);
    }
})();


// undefined route handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found" }); 
});
  

//
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});
  

// expose server
app.listen(PORT, () => {
    console.log(`Express-MySQL server is running on port ${PORT}`);
});

