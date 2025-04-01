const fs = require('fs');
const mysqlPool = require('../config/mysql') 

const initDb = async () => {
  try {
    const files = [
      'createUsers.sql',
      'createChannels.sql',
      'createPost.sql',
      'createReplies.sql',
    ];

    for (const file of files) {
      const sql = fs.readFileSync(`./${file}`, 'utf8');
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
