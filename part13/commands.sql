CREATE TABLE blogs (
  id SERIAL UNIQUE PRIMARY KEY,
  author VARCHAR,
  url VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs
(author, url, title, likes)
VALUES
('author 1', 'url 1', 'title 1', 1),
('author 2', 'url 2', 'title 2', 2);
