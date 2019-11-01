UPDATE friendship
SET friend1_wins = $2, game_active = null
WHERE friendship_id = $1;