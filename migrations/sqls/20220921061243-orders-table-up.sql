CREATE TABLE orders(id SERIAL PRIMARY KEY , users_id BIGINT  , status_of_order VARCHAR(50), FOREIGN KEY (users_id) REFERENCES user_table(id) ON delete RESTRICT);
