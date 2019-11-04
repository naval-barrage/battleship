UPDATE gameroom
SET turn = $1, total_turns = 1, ships_placed = true
WHERE gameroom_id = $2;