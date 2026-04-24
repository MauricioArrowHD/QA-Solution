
CREATE TABLE colors (
    id SERIAL NOT NULL,
    description VARCHAR(50) NOT NULL,
    CONSTRAINT pk_colors PRIMARY KEY (id)
);

CREATE TABLE brands (
    id SERIAL NOT NULL,
    description VARCHAR(50) NOT NULL,
    CONSTRAINT pk_brands PRIMARY KEY (id)
);

CREATE TABLE years (
    id SERIAL NOT NULL,
    description VARCHAR(50) NOT NULL,
    CONSTRAINT pk_years PRIMARY KEY (id)
);

CREATE TABLE cars (
    id SERIAL NOT NULL,
    model VARCHAR(50) NOT NULL,
    color_id INT4 NOT NULL,
    brand_id INT4 NOT NULL,
    year_id INT4 NOT NULL,
    CONSTRAINT pk_cars PRIMARY KEY (id),
    CONSTRAINT fk_cars_color_id FOREIGN KEY (color_id) REFERENCES colors (id),
    CONSTRAINT fk_cars_brand_id FOREIGN KEY (brand_id) REFERENCES brands (id),
    CONSTRAINT fk_cars_year_id FOREIGN KEY (year_id) REFERENCES years (id)
);

INSERT INTO colors (description) VALUES
    ('Red'),
    ('Black'),
    ('White');

INSERT INTO brands (description) VALUES
    ('Toyota'),
    ('Honda'),
    ('Ford'),
    ('Nissan');

INSERT INTO years (description) VALUES
    ('2020'),
    ('2021'),
    ('2022'),
    ('2023'),
    ('2024');

INSERT INTO cars (model, color_id, brand_id, year_id) VALUES
    ('Corolla', 1, 1, 3),
    ('Corolla', 2, 1, 4),
    ('Corolla', 3, 1, 5),
    ('Hilux', 2, 1, 5),
    ('Hilux', 1, 1, 2),
    ('Camry', 3, 1, 4),
    ('Civic', 2, 2, 4),
    ('Civic', 1, 2, 2),
    ('Civic', 3, 2, 5),
    ('CR-V', 3, 2, 3),
    ('CR-V', 2, 2, 1),
    ('Accord', 1, 2, 5),
    ('Mustang', 1, 3, 5),
    ('Mustang', 2, 3, 1),
    ('Mustang', 3, 3, 3),
    ('Explorer', 2, 3, 4),
    ('Explorer', 1, 3, 2),
    ('F-150', 3, 3, 5),
    ('Sentra', 3, 4, 2),
    ('Sentra', 1, 4, 4),
    ('Sentra', 2, 4, 5),
    ('Altima', 1, 4, 1),
    ('Altima', 3, 4, 3),
    ('Versa', 2, 4, 4);

-- Level 1
select * from cars where model = 'Corolla';

-- Level 2
select c.id , c.model , b.description, c.color_id, c.year_id  from cars c
join brands b 
on c.brand_id = b.id
where b.description = 'Toyota';

-- Level 3
SELECT c.id,
       c.model,
       b.description AS brand,
       co.description AS color,
       y.description AS year
FROM cars c
JOIN brands b  ON c.brand_id = b.id
JOIN colors co ON c.color_id = co.id
JOIN years y   ON c.year_id  = y.id
WHERE b.description  = 'Honda'
  AND co.description = 'Black'
  AND y.description  = '2022'
UNION ALL
SELECT NULL, 'no hay modelos', NULL, NULL, NULL
WHERE NOT EXISTS (
    SELECT 1
    FROM cars c
    JOIN brands b  ON c.brand_id = b.id
    JOIN colors co ON c.color_id = co.id
    JOIN years y   ON c.year_id  = y.id
    WHERE b.description  = 'Honda'
      AND co.description = 'Black'
      AND y.description  = '2022'
);

