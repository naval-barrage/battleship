SELECT friendship_id FROM friendship
WHERE (friend1 = $1 AND friend2 = $2) OR (friend1 = $2 AND friend2 = $1);