CREATE DATABASE quizrat;

CREATE TABLE questions(
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(255),
    alternatives VARCHAR(255)[],
    answer_id SMALLINT,
    quiz VARCHAR(255),
    category VARCHAR(255)
);


CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category VARCHAR(255) UNIQUE
);

CREATE TABLE quizes(
    quiz_id SERIAL PRIMARY KEY,
    quiz VARCHAR(255) UNIQUE
);