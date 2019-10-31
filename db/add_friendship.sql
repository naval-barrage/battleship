INSERT INTO friendship (friend1, friend2, games_played, friend1_wins, friend2_wins, game_active)
VALUES
    ($1, $2, 0, 0, 0, null);

SELECT username FROM users
WHERE user_id = $2;