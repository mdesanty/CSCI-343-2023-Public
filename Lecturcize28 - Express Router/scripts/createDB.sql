DROP DATABASE IF EXISTS books_db;
CREATE DATABASE books_db;

\c books_db

DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  author_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS authors CASCADE;
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

DO $$
  DECLARE
    dr_seuss_id INT;
    margaret_wise_brown_id INT;
    william_goldman_id INT;
    thomas_harris_id INT;
    michael_scott_id INT;
  BEGIN
    INSERT INTO authors(name) VALUES('Dr. Seuss') RETURNING id INTO dr_seuss_id;
    INSERT INTO books(name, author_id) VALUES('The Cat in the Hat', dr_seuss_id);

    INSERT INTO authors(name) VALUES('Margaret Wise Brown') RETURNING id INTO margaret_wise_brown_id;
    INSERT INTO books(name, author_id) VALUES('Goodnight Moon', margaret_wise_brown_id);

    INSERT INTO authors(name) VALUES('William Goldman') RETURNING id INTO william_goldman_id;
    INSERT INTO books(name, author_id) VALUES('The Princess Bride', dr_seuss_id);

    INSERT INTO authors(name) VALUES('Thomas Harris') RETURNING id INTO thomas_harris_id;
    INSERT INTO books(name, author_id) VALUES('The Silence of the Lambs', thomas_harris_id);

    INSERT INTO authors(name) VALUES('Michael G. Scott') RETURNING id INTO michael_scott_id;
    INSERT INTO books(name, author_id) VALUES('Somehow I Manage', michael_scott_id);
  END
$$
