SELECT * FROM friendship
WHERE friend1 = $1 OR friend2 = $1
ORDER BY game_active DESC;