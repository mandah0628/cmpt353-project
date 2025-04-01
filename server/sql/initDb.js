const fs = require('fs');
const path = require('path');
const mysqlPool = require('../config/mysql');

const initDb = async () => {
  const files = ['createUsers.sql', 'createChannels.sql', 'createPost.sql', 'createReplies.sql'];

  try {
    for (const file of files) {
      
      const sqlPath = path.join(__dirname, file);
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await mysqlPool.query(sql);
      console.log(`✅ Executed ${file}`);
    }
    console.log('✅ All tables created!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating tables:', err);
    process.exit(1);
  }
};

initDb();
