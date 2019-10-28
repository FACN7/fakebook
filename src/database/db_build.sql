BEGIN;

  DROP TABLE IF EXISTS users, posts CASCADE;

  CREATE TABLE
  users
  (
  user_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL unique,
  password TEXT NOT NULL,

);

INSERT INTO users
  (name,email,password)
VALUES
  ('Omri', 'omri@gmail.com', '123'),('Karem','karem@gmail.com','123');


CREATE TABLE
IF NOT EXISTS posts
(
  posts_id SERIAL NOT NULL,
  user_id INTEGER,
  title varchar(100)  NOT NULL ,
  content text  NOT NULL ,
  post_date DATE NOT NULL DEFAULT CURRENT_DATE,


  PRIMARY KEY
(post_id,user_id),
  FOREIGN KEY
(user_id) REFERENCES users
(user_id)
);

INSERT INTO posts (user_id,title,content,post_date) VALUES (1,1,'first title','first content');

COMMIT;
