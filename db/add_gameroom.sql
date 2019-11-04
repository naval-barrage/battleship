INSERT INTO gameroom (host_id, guest_id, turn, starting_time, total_turns, host_hits, guest_hits, host_misses, guest_misses, host_ships_sunk, guest_ships_sunk, ships_placed)
VALUES ($1, $2, $1, $3, 0, 0, 0, 0, 0, 0, 0, false)
RETURNING gameroom_id;