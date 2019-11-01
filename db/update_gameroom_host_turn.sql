UPDATE gameroom
SET turn = $1, host_hits = $2, host_misses = $3, host_ships_sunk = $4
WHERE gameroom_id = $5;