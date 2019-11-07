INSERT INTO users (username, email, img, level, xp)
VALUES 
    ($1, $2, 'https://image.flaticon.com/icons/png/512/184/184049.png', 2, 0)
RETURNING user_id;