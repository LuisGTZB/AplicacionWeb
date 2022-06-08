CREATE DATABASE database_LNL;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    nombre VARCHAR(100) NOT NULL
);

ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users 
    MODIFY id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;
-- Products table
CREATE TABLE products(
    id INT(11) NOT NULL,
    productname VARCHAR(20) NOT NULL,
    description TEXT,
    price INT(11) NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE products
    ADD PRIMARY KEY (id);

ALTER TABLE products 
    MODIFY id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
