require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: "http://react:5173",
    credentials: true
}));


const mysqlPool = require('./config/mysql');
const { couch } = require('./config/couchdb');

(async () => {
    try {
      const connection = await mysqlPool.getConnection();
      console.log('✅ MySQL connected');
      connection.release();
    } catch (err) {
      console.error('❌ MySQL connection error:', err.message);
    }
})();


// CouchDB Test
(async () => {
    try {
      const dbList = await couch.db.list();
      console.log('✅ CouchDB connected. Databases:', dbList);
    } catch (err) {
      console.error('❌ CouchDB connection error:', err.message);
    }
})();


app.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found" }); 
});
  

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});
  

app.get("/", (req,res) => {
    console.log("Hello puta");
    res.json({message: "Hello puta"});
});

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});

