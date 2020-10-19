-- DATABASE: clutchtime

INSERT INTO sports (id, name, created_at, modified_at, active)
VALUES(1, 'Baloncesto', current_timestamp, current_timestamp, true);
INSERT INTO sports (id, name, created_at, modified_at, active)
VALUES(2, 'Fútbol', current_timestamp, current_timestamp, true);
INSERT INTO sports (id, name, created_at, modified_at, active)
VALUES(3, 'Rugby', current_timestamp, current_timestamp, true);
INSERT INTO sports (id, name, created_at, modified_at, active)
VALUES(4, 'Ultimate Freesbee', current_timestamp, current_timestamp, true);

UPDATE users SET is_admin = true 
WHERE id = 1 AND username = 'Admin' AND active = true;
