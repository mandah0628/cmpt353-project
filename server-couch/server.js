require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 9090;


app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: "http://mysql:8080",
    credentials: true
}));


const { couch } = require('./config/couchdb');


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
  

app.listen(PORT, () => {
    console.log(`Express-Couch server is running on port ${PORT}`);
});

