CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    channelId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    createdAt VARCHAR(255) NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(channelId) REFERENCES channels(id) ON DELETE CASCADE
);