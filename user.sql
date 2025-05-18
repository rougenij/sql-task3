-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
) ENGINE=InnoDB;

-- Passwords: user1, user2..
INSERT INTO users (username, email, password_hash, role) VALUES
('user1', 'user1@example.com', '$2a$10$qbYurh0UPy6wAlrU80mHA.mUR5aIKbf73yZnbYMpbHbLBTHZqD5gS', 'admin'),  -- user1: "user1"
('user2', 'user2@example.com', '$2a$10$zHE46d9NrzijDouzow/cXeXprUXpljSPuEh/FT4.LFf9WIAe9DMSu', 'user'),    -- user2: "user2"
('user3', 'user3@example.com', '$2a$10$1kkrhD4LhHeRSNdlVUSJg.nOfhGlEdPxwAsRu2zAahxYFIjWerqSG', 'user'),    -- user3: "user3"
('user4', 'user4@example.com', '$2a$10$Fj4DPHUBptP7UKkn6lV8rWTeG27cpQFx2UtgoRc.t6QLD4F45BQCa', 'user'),    -- user4: "user4"
('user5', 'user5@example.com', '$2a$10$u0F67v1AC8OFYgkxXRGwWkL7mXnb7h5DN1.mj9L.VLv.TbZkzJHga', 'user');    -- user5: "user5"

