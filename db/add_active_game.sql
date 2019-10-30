UPDATE friendship
SET game_active = $1
WHERE friend1 = $2 AND friend2 = $3 OR friend1 = $3 AND friend2 = $2;