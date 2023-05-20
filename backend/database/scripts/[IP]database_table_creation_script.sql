-- Users table: separate name and last name columns, add logon and cover_picture columns

CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
birthday DATE,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
bio TEXT,
profile_picture LONGBLOB,
cover_picture LONGBLOB,
is_logged_in BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Friendships table
CREATE TABLE friendships (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id1 INT NOT NULL,
user_id2 INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id1) REFERENCES users(id),
FOREIGN KEY (user_id2) REFERENCES users(id)
);

-- Friend Requests table
CREATE TABLE friend_requests (
id INT PRIMARY KEY AUTO_INCREMENT,
sender_id INT NOT NULL,
receiver_id INT NOT NULL,
status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (sender_id) REFERENCES users(id),
FOREIGN KEY (receiver_id) REFERENCES users(id)
);


-- Conversations table
CREATE TABLE conversations (
id INT PRIMARY KEY AUTO_INCREMENT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Conversation_users table
CREATE TABLE conversation_users (
id INT PRIMARY KEY AUTO_INCREMENT,
conversation_id INT NOT NULL,
user_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (conversation_id) REFERENCES conversations(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Messages table
CREATE TABLE messages (
id INT PRIMARY KEY AUTO_INCREMENT,
conversation_id INT NOT NULL,
user_id INT NOT NULL,
content TEXT NOT NULL,
file_data LONGBLOB,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (conversation_id) REFERENCES conversations(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Posts table: add ad_location and status columns, allow multiple images

CREATE TABLE posts (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
content TEXT NOT NULL,
location VARCHAR(255),
status VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Post_images table for multiple images

CREATE TABLE post_images (
id INT PRIMARY KEY AUTO_INCREMENT,
post_id INT NOT NULL,
image_link VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- Likes table
CREATE TABLE likes (
id INT PRIMARY KEY AUTO_INCREMENT,
post_id INT NOT NULL,
user_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES posts(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Comments table with reported column
CREATE TABLE comments (
id INT PRIMARY KEY AUTO_INCREMENT,
post_id INT NOT NULL,
user_id INT NOT NULL,
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES posts(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Comment reports table
CREATE TABLE comment_reports (
id INT PRIMARY KEY AUTO_INCREMENT,
comment_id INT NOT NULL,
user_id INT NOT NULL,
reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (comment_id) REFERENCES comments(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Ads table: add location and status columns
CREATE TABLE ads (
id INT PRIMARY KEY AUTO_INCREMENT,
publisher_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
image_link VARCHAR(255),
content TEXT NOT NULL,
keywords VARCHAR(255) NOT NULL,
link VARCHAR(255) NOT NULL,
location VARCHAR(255),
status VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (publisher_id) REFERENCES users(id)
);

-- Ad clicks table: add clicks_count column
CREATE TABLE ad_clicks (
id INT PRIMARY KEY AUTO_INCREMENT,
ad_id INT NOT NULL,
user_id INT NOT NULL,
clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
clicks_count INT DEFAULT 0,
FOREIGN KEY (ad_id) REFERENCES ads(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Notifications table
CREATE TABLE notifications (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
message TEXT NOT NULL,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Keywords table
CREATE TABLE keywords (
id INT PRIMARY KEY AUTO_INCREMENT,
ad_profile_id INT NOT NULL,
word VARCHAR(255) NOT NULL,
frequency INT,
sentiment_score FLOAT,
score FLOAT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (ad_profile_id) REFERENCES ad_profiles(id)
);

-- Ad_profiles table
CREATE TABLE ad_profiles (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);
