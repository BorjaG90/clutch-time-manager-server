-- MySQL
-- DATABASE: clutchtime
USE clutchtime;


DROP TABLE IF EXISTS contracts CASCADE;
DROP TABLE IF EXISTS inscriptions CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS divisions CASCADE;
DROP TABLE IF EXISTS competitions CASCADE;
DROP TABLE IF EXISTS seasons CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS sports CASCADE;

-- SPORTS TABLE
CREATE TABLE IF NOT EXISTS sports (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,

  CONSTRAINT pk_sports PRIMARY KEY (id)
);

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users(
  id BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  club_name VARCHAR(100),
  money FLOAT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,
  is_admin BOOLEAN NOT NULL,
  last_access TIMESTAMP,

  CONSTRAINT pk_users PRIMARY KEY (id)
);

-- SEASONS TABLE
CREATE TABLE IF NOT EXISTS seasons(
  id BIGINT NOT NULL AUTO_INCREMENT,
  season_year INTEGER NOT NULL,
  season_number INTEGER NOT NULL,
  init_date DATE NOT NULL,
  end_date DATE NOT NULL,
  actual BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,

  CONSTRAINT pk_seasons PRIMARY KEY (id)
);

-- COMPETITIONS TABLE
CREATE TABLE IF NOT EXISTS competitions(
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  division INTEGER NOT NULL,
  competition_type INTEGER NOT NULL,
  init_date DATE NOT NULL,
  end_date DATE NOT NULL,
  sport_id BIGINT NOT NULL,
  season_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,
  
  CONSTRAINT pk_competitions PRIMARY KEY (id),
  CONSTRAINT fk_competition_season FOREIGN KEY (season_id) REFERENCES seasons(id),
  CONSTRAINT fk_competition_sport FOREIGN KEY (sport_id) REFERENCES sports(id)
);

-- GROUPS TABLE
CREATE TABLE IF NOT EXISTS divisions(
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  competition_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,
  
  CONSTRAINT pk_groups PRIMARY KEY (id),
  CONSTRAINT fk_division_competition FOREIGN KEY (competition_id) REFERENCES competitions(id)
);

-- TEAMS TABLE
CREATE TABLE IF NOT EXISTS teams(
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  city VARCHAR(50),
  user_id BIGINT NOT NULL,
  sport_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,
  
  CONSTRAINT pk_teams PRIMARY KEY (id),
  CONSTRAINT fk_team_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_team_sport FOREIGN KEY (sport_id) REFERENCES sports(id)
);

-- PLAYERS TABLE
CREATE TABLE IF NOT EXISTS players(
  id BIGINT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  first_position INTEGER NOT NULL,
  second_position INTEGER NOT NULL,
  sport_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,

  CONSTRAINT pk_players PRIMARY KEY (id),
  CONSTRAINT fk_player_sport FOREIGN KEY (sport_id) REFERENCES sports(id)
);

-- INSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS inscriptions(
  id BIGINT NOT NULL AUTO_INCREMENT,
  division_id BIGINT NOT NULL,
  team_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,
  
  CONSTRAINT pk_inscriptions PRIMARY KEY (id),
  CONSTRAINT fk_inscription_division FOREIGN KEY (division_id) REFERENCES divisions(id),
  CONSTRAINT fk_inscription_team FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- CONTRACTS TABLE
CREATE TABLE IF NOT EXISTS contracts(
  id BIGINT NOT NULL AUTO_INCREMENT,
  player_id BIGINT NOT NULL,
  team_id BIGINT NOT NULL,
  init_date DATE NOT NULL,
  end_date DATE NOT NULL,
  salary FLOAT(15) NOT NULL,
  contract_type INTEGER,
  created_at TIMESTAMP NOT NULL,
  modified_at TIMESTAMP,
  active BOOLEAN NOT NULL,

  CONSTRAINT pk_contracts PRIMARY KEY (id),
  CONSTRAINT fk_contract_player FOREIGN KEY (player_id) REFERENCES players(id),
  CONSTRAINT fk_contract_team FOREIGN KEY (team_id) REFERENCES teams(id)
);
