INSERT INTO users (username, email, img, level, xp)
VALUES 
    ($1, $2, null, 1, 0)
RETURNING user_id;