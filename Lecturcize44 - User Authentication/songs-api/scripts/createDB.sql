DROP DATABASE IF EXISTS songs_db;
CREATE DATABASE songs_db;

\c songs_db

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS songs CASCADE;
CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

DO $$
  DECLARE
    michael_user_id INT;
  BEGIN
    -- Password: P@ssw0rd!
    INSERT INTO users(email, password) VALUES('michael.desanty@mcla.edu', '$2a$12$Y5D7gtrXx8inzxq/143NNuu3oOv6Vb5g8Ug/n1ohJNgbnSQgebM2y') RETURNING id INTO michael_user_id;

    INSERT INTO songs(name, user_id) VALUES('Kryptonite', michael_user_id);
    INSERT INTO songs(name, user_id) VALUES('Bohemian Rhapsody', michael_user_id);
    INSERT INTO songs(name, user_id) VALUES('Cold', michael_user_id);
  END
$$
