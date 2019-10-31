UPDATE gameroom
SET turn = $1, guest_hits = $2, guest_misses = $3, guest_ships_sunk = $4, total_turns = $5
WHERE gameroom_id = $6;