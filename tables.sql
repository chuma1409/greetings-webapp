CREATE TABLE greet(
id serial not null,
name varchar(255) NOT NULL,
counter int not null
 );

INSERT INTO greet (name, counter)
VALUES ($1, 0);
DELETE FROM greet WHERE id = 1;

	CREATE TABLE greetingtest(
id serial not null,
name varchar(255) NOT NULL,
counter int not null
 );