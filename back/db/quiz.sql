DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;

PRAGMA foreign_keys = ON;

CREATE TABLE user (
   id INTEGER NOT NULL PRIMARY KEY,
   username TEXT,
   avatar TEXT,
   score INTEGER,
   password TEXT
);

CREATE TABLE quizzes (
   id INTEGER NOT NULL PRIMARY KEY,
   name TEXT,
   picture_url TEXT,
   author TEXT,
   keywords TEXT
);

CREATE TABLE questions (
   id INTEGER NOT NULL PRIMARY KEY,
   sentence TEXT NOT NULL,
   video_url TEXT,
   score INTEGER,
   quizzes_id INTEGER REFERENCES quizzes(id)
);

CREATE TABLE answers (
   id INTEGER NOT NULL PRIMARY KEY,
   sentence TEXT,
   picture_url TEXT check((sentence IS NULL AND picture_url IS NOT NULL) OR (sentence IS NOT NULL AND picture_url IS NULL)),
   solution INTEGER check(solution in (0,1)),
   questions_id INTEGER REFERENCES questions(id)
);

INSERT INTO quizzes (name,picture_url,author,keywords)
VALUES
   ("Computing", "computing.png", "admin","ordinateurcomputer"),
   ("Youtube", "youtube.png", "admin","youtubewebvideo"),
   ("Emojis", "emojis.png", "admin","emoji");

INSERT INTO questions (sentence,video_url, score, quizzes_id)
VALUES
   ("What is the web ?",null, 3, 1),
   ("Which of these is not a web browser ?",null, 3, 1),
   ("What is the best way to send a file to a japanese friend ?",null, 1, 1),
   ("What is the hidden side of the internet called ?",null, 1, 1),
   ("What is a URL ?",null, 1, 1),

   (" ","video.mp4", 3, 2),
   ("Which Swiss videographer is making videos in strange places ?",null, 1, 2),
   ("Which French youtuber living in Japan has a Japanese grocery store online ?",null, 1, 2),
   ("From which youtuber is the quote 'I code with my ass' ?",null, 1, 2),
   ("Who pretended to be a speed camera in one of his videos ?",null, 1, 2),

   ("What is the less used emoji (12 march 2020)",null, 3, 3),
   ("What is the most used emoji (12 march 2020)",null, 1, 3);

INSERT INTO answers (sentence, picture_url, solution, questions_id)
VALUES
   ("Is just letters of 'Will Enjoy the Battle'", NULL, 0, 1),
   ("Abbreviation of the World Wide Web", NULL, 1, 1),
   ("Letters of 'Wanna Eat Browser'", NULL, 0, 1),
   ("Abbreviation of the Word Wild Web", NULL, 0, 1),

   ("Firefox", NULL, 0, 2),
   ("Chrome", NULL, 0, 2),
   ("Photoshop", NULL, 1, 2),
   ("Netscape", NULL, 0, 2),

   ("By carrier pigeon", NULL, 0, 3),
   ("By wireshark", NULL, 0, 3),
   ("By USB key send by air mail", NULL, 0, 3),
   ("By email", NULL, 1, 3),

   ("Deep web", NULL, 1, 4),
   ("Keep web", NULL, 0, 4),
   ("Shadow web", NULL, 0, 4),
   ("Hide a web", NULL, 0, 4),

    ("The Union of Ranking Languages", NULL, 0, 5),
    ("A link of a website or a ressource", NULL, 1, 5),
    ("A email spam", NULL, 0, 5),
    ("Some people who using the internet", NULL, 0, 5),

    ("Mais voila, espece de ****", NULL, 0, 6),
    ("Mais voila, mais c'était sur en fait!", NULL, 1, 6),
    ("Mais voila, je suis plus fort que lui !", NULL, 0, 6),
    ("The answer D", NULL, 0, 6),

    ("Squeezie", NULL, 0, 7),
    ("Pewdipie", NULL, 0, 7),
    ("Joyca", NULL, 0, 7),
    ("Grand JD", NULL, 1, 7),

    ("Louis san", NULL, 0, 8),
    ("Japania", NULL, 0, 8),
    ("Ici Japon", NULL, 1, 8),
    ("Ichiban Japan", NULL, 0, 8),

    ("L'hermite moderne", NULL, 1, 9),
    ("Salut les geek", NULL, 0, 9),
    ("Trash", NULL, 0, 9),
    ("Mister V", NULL, 0, 9),

    ("CyrilMp4", NULL, 0, 10),
    ("Cyprien", NULL, 0, 10),
    ("Rémi Gaillard", NULL, 1, 10),
    ("Neoxi", NULL, 0, 10),

     (null, "coeur.png", 0, 11),
     (null, "ecole.png", 0, 11),
     (null, "symbols.png", 1, 11),
     (null, "abcd.png", 0, 11),

     (null, "pleurejoie.png", 1, 12),
     (null, "pleure.png", 0, 12),
     (null, "pouce.png", 0, 12),
     (null, "coeur.png", 0, 12);
