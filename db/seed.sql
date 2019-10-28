DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS login;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email TEXT,
    img TEXT,
    username VARCHAR(30),
    xp INT,
    lever INT
);

CREATE TABLE login (
    user_login_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    hash TEXT
);