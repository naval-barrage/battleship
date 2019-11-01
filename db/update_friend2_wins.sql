UPDATE friendship
SET friend2_wins = $2, game_active = null
WHERE friendship_id = $1;