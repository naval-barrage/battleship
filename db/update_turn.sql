UPDATE gameroom
SET turn = $1
WHERE gameroom_id = $2;