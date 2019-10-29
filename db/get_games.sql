SELECT * FROM gameroom
WHERE host_id = $1 OR guest_id = $1;