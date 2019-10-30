BEGIN;

  DROP TABLE IF EXISTS users, posts;

  CREATE TABLE
  IF NOT EXISTS users
  (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR
  (50) NOT NULL,
    email VARCHAR
  (50) UNIQUE NOT NULL,
    password VARCHAR
  (200) NOT NULL
  );

  INSERT INTO users
    (name,email,password)
  VALUES
    ('Omri', 'omriza5@gmail.com', '$2a$10$jaE1jYP32AEiEqbLQpyCBuCfLcXyqfmzNZHt5rUptz5xoRxW/RbgG'),
    ('Karem', 'karem@gmail.com', '$2a$10$jaE1jYP32AEiEqbLQpyCBuCfLcXyqfmzNZHt5rUptz5xoRxW/RbgG');

  CREATE TABLE
  IF NOT EXISTS posts
  (
    posts_id serial PRIMARY KEY NOT NULL,
    user_id integer NOT NULL REFERENCES users
  (user_id),
    title TEXT NOT NULL,
    description TEXT NOT NULL UNIQUE,
    date DATE NOT NULL DEFAULT CURRENT_DATE 
  );

INSERT INTO posts
  (user_id,title,description)
VALUES
  (1, 'first tilte', 'this is my first title');



COMMIT;
