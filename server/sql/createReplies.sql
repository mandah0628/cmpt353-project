CREATE TABLE IF NOT EXISTS replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    userId INT NOT NULL,
    parentReplyId INT DEFAULT NULL,
    comment TEXT NOT NULL,
    image LONGBLOB DEFAULT NULL,
    imageMimeType VARCHAR(255) DEFAULT NULL,
    createdAt VARCHAR(255) NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY(parentReplyId) REFERENCES replies(id) ON DELETE CASCADE
);