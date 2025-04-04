const fs = require('fs');
const path = require('path');
const mysqlPool = require('../config/mysql');

// creates the tables in the db
const initDb = async () => {
  const files = ['createUsers.sql', 'createChannels.sql', 'createPost.sql', 'createReplies.sql'];

  try {
    for (const file of files) {
      
      const sqlPath = path.join(__dirname, file);
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await mysqlPool.query(sql);
      
    }
    console.log('All tables have been created in db');
    process.exit(0);
  } catch (err) {
    console.error('ERROR creating tables:', err);
    process.exit(1);
  }
};

initDb();
