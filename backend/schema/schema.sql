CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_leetcode_completed_at TIMESTAMP,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    leetcode_username VARCHAR(50) UNIQUE,
)

CREATE TABLE friends (
    user_id INT REFERENCES users (id),
    friend_id INT REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id)
)