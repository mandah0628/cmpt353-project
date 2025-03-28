CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    chanelId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    FOREIGN KEY(chanelId) REFERENCES channels
);