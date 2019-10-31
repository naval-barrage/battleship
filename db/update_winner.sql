UPDATE users
SET xp = $2, level = $3
WHERE user_id = $1;