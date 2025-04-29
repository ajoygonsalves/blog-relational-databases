CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('John Doe', 'https://example.com', 'My First Blog', 10);
INSERT INTO blogs (author, url, title, likes) VALUES ('Jane Doe', 'https://example.com', 'My Second Blog', 20);
