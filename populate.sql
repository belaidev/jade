-- Courses populating script
-- drop database main;
-- create database main;
use main;
show tables;
select * from Persons;
select * from Students;
select * from Courses;
select * from Reviews;

select * from AsynchronousCourses;
select * from Chapters;
select * from Lessons;

select * from Classes;
select * from SynchronousCourses;

-- Insérez d'abord les enregistrements dans la table Users
INSERT INTO Users (id) VALUES (1), (2), (3);
-- Insérez les personnes
INSERT INTO Persons (id, avatarUrl, firstName, lastName, pronoun, occupation)
VALUES
    (1, 'url_avatar_1.jpg', 'John', 'Doe', 'il', 'professionnel'),
    (2, 'url_avatar_2.jpg', 'Jane', 'Doe', 'elle', 'professionnel'),
    (3, 'url_avatar_3.jpg', 'Alice', 'Smith', 'elle', 'professionnel');

-- Insérez les instructeurs d'abord
INSERT INTO Instructors (id) VALUES (1), (2), (3);

-- Ensuite, vous pouvez insérer les cours en utilisant les identifiants corrects des instructeurs
INSERT INTO Courses (title, description, instructorId, thumbnailUrl, price, discount)
VALUES
    ('Cours de MySQL', 'Description du cours', 1, '/img/img-001.jpg', 50, 20),
    ('Cours de Programmation Javascript', 'Description du cours', 2, '/img/img-002.jpg', 60, 30),
    ('Cours de Programmation PHP', 'Description du cours', 3, '/img/img-003.jpg', 70, 40);

-- Insertion des données de cours asynchrones
INSERT INTO AsynchronousCourses (id) VALUES (1), (2), (3);

-- Insertion des données de chapitres pour chaque cours
INSERT INTO Chapters (asynchronousCourseId, title, description) VALUES
-- Chapitres pour le premier cours
(1, 'Introduction aux bases de données SQL', 'Ce chapitre présente les bases du SQL.'),
(1, 'Les requetes SQL', 'Ce chapitre couvre les requetes SQL.'),
-- Chapitres pour le deuxième cours
(2, 'Principes de la Programmation Orientée Objet', 'Ce chapitre explique les concepts fondamentaux de la programmation orientée objet.'),
(2, 'Encapsulation et Héritage en JS', 'Ce chapitre détaille les principes d\'encapsulation et d\'héritage en Javascript.'),
-- Chapitres pour le troisième cours
(3, 'Introduction à PHP', 'Ce chapitre introduit les concepts de base de la programmation web.'),
(3, 'Architecture M-V-C', 'Ce chapitre couvre les bases de l\'architecture MVC dans un projet en PHP.');

-- Insertion des données de leçons pour chaque chapitre
INSERT INTO Lessons (chapterId, title, description, capsuleUrl, remote, duration) VALUES
-- Leçons pour le premier chapitre du premier cours
(1, 'Types de Données', 'Ce cours explique les types de données dans MySQL.', 'url_lecon_1_chapitre_1_cours_1', 1, '01:30:00'),
(1, 'Structures des tables', 'Ce cours détaille les structures des tables.', 'url_lecon_2_chapitre_1_cours_1', 1, '02:15:00'),
-- Leçons pour le deuxième chapitre du premier cours
(2, 'Requetes de base', 'Ce cours aborde les requetes de base.', 'url_lecon_1_chapitre_2_cours_1', 0, '00:45:00'),
(2, 'Requetes avancées', 'Ce cours explore les requetes avancées.', 'url_lecon_2_chapitre_2_cours_1', 0, '01:00:00'),
-- Leçons pour le premier chapitre du deuxième cours
(3, 'Introduction à la Programmation Orientée Objet', 'Ce cours introduit les principes de la programmation orientée objet.', 'url_lecon_1_chapitre_1_cours_2', 1, '00:45:00'),
(3, 'Introduction à Javascript', 'Ce cours explore les concepts de base de JS.', 'url_lecon_2_chapitre_1_cours_2', 1, '01:30:00'),
-- Leçons pour le deuxième chapitre du deuxième cours
(4, 'Les objets', 'Ce cours explique les objets en javascript.', 'url_lecon_1_chapitre_2_cours_2', 1, '01:15:00'),
(4, 'Les fonctions', 'Ce cours couvre les fonctions en javascripts.', 'url_lecon_2_chapitre_2_cours_2', 1, '02:00:00'),
-- Leçons pour le premier chapitre du troisième cours
(5, 'Bases de la programmation web', 'Ce cours enseigne les principes de base de la programmation web.', 'url_lecon_1_chapitre_1_cours_3', 1, '01:00:00'),
(5, 'Introduction au language PHP', 'Ce cours est une introduction au language PHP.', 'url_lecon_2_chapitre_1_cours_3', 1, '01:45:00'),
-- Leçons pour le deuxième chapitre du troisième cours
(6, 'Les models', 'Cours sur les models en MVC.', 'url_lecon_1_chapitre_2_cours_3', 1, '00:30:00'),
(6, 'Les controlleurs', 'Cours sur les controlleurs en MVC.', 'url_lecon_2_chapitre_2_cours_3', 1, '01:15:00');

-- Insérez les étudiants à partir des personnes
INSERT INTO Students (id) VALUES (1), (2), (3);

-- Insertion des notes pour les cours asynchrones
INSERT INTO Reviews (studentId, courseId, rating, comment) VALUES
    -- Notes pour le premier cours (Cours de MySQL)
    (1, 1, 5, 'Excellent cours sur les bases de données SQL. Très détaillé et bien expliqué.'),
    (2, 1, 4, 'Très bon cours, mais certaines sections sont un peu longues.'),
    (3, 1, 5, 'Parfait pour les débutants comme moi. J\'ai appris beaucoup de choses.'),

    -- Notes pour le deuxième cours (Cours de Programmation Javascript)
    (1, 2, 4, 'Bon cours sur Javascript, mais aurait pu inclure plus d\'exemples pratiques.'),
    (2, 2, 5, 'Excellent ! Très bien structuré et facile à suivre.'),
    (3, 2, 4, 'Bon contenu, mais la qualité des vidéos pourrait être améliorée.'),

    -- Notes pour le troisième cours (Cours de Programmation PHP)
    (1, 3, 3, 'Le cours est bon, mais pourrait être plus interactif.'),
    (2, 3, 4, 'Contenu solide, mais certaines parties étaient un peu difficiles à comprendre.'),
    (3, 3, 5, 'Super cours sur PHP, j\'ai beaucoup appris sur la programmation web.');

-- Cours Synchrones
-- Insertion des cours synchrones
INSERT INTO Courses (title, description, instructorId, thumbnailUrl, price, discount)
VALUES
    ('Cours Synchrone 1', 'Description du cours synchrone 1', 1, '/img/img-004.jpg', 100, 0),
    ('Cours Synchrone 2', 'Description du cours synchrone 2', 2, '/img/img-005.jpg', 110, 0),
    ('Cours Synchrone 3', 'Description du cours synchrone 3', 3, '/img/img-006.jpg', 120, 0),
    ('Cours Synchrone 4', 'Description du cours synchrone 4', 1, '/img/img-007.jpg', 130, 0),
    ('Cours Synchrone 5', 'Description du cours synchrone 5', 2, '/img/img-008.jpg', 140, 0);

-- Insertion des cours synchrones dans la table SynchronousCourses
INSERT INTO SynchronousCourses (id, location) VALUES
    (4, 'Location 1'),
    (5, 'Location 2'),
    (6, 'Location 3'),
    (7, 'Location 4'),
    (8, 'Location 5');

-- Insertion des classes pour chaque cours synchrone
-- Classes pour le premier cours synchrone
INSERT INTO Classes (synchronousCourseId, startTime, endTime, meetingUrl) VALUES
    (4, '2024-05-01 10:00:00', '2024-05-01 12:00:00', 'url_meeting_1_1'),
    (4, '2024-05-02 10:00:00', '2024-05-02 12:00:00', 'url_meeting_1_2'),
    (4, '2024-05-03 10:00:00', '2024-05-03 12:00:00', 'url_meeting_1_3');

-- Classes pour le deuxième cours synchrone
INSERT INTO Classes (synchronousCourseId, startTime, endTime, meetingUrl) VALUES
    (5, '2024-05-01 14:00:00', '2024-05-01 16:00:00', 'url_meeting_2_1'),
    (5, '2024-05-02 14:00:00', '2024-05-02 16:00:00', 'url_meeting_2_2'),
    (5, '2024-05-03 14:00:00', '2024-05-03 16:00:00', 'url_meeting_2_3');

-- Classes pour le troisième cours synchrone
INSERT INTO Classes (synchronousCourseId, startTime, endTime, meetingUrl) VALUES
    (6, '2024-05-04 10:00:00', '2024-05-04 12:00:00', 'url_meeting_3_1'),
    (6, '2024-05-05 10:00:00', '2024-05-05 12:00:00', 'url_meeting_3_2'),
    (6, '2024-05-06 10:00:00', '2024-05-06 12:00:00', 'url_meeting_3_3');

-- Classes pour le quatrième cours synchrone
INSERT INTO Classes (synchronousCourseId, startTime, endTime, meetingUrl) VALUES
    (7, '2024-05-07 10:00:00', '2024-05-07 12:00:00', 'url_meeting_4_1'),
    (7, '2024-05-08 10:00:00', '2024-05-08 12:00:00', 'url_meeting_4_2'),
    (7, '2024-05-09 10:00:00', '2024-05-09 12:00:00', 'url_meeting_4_3');

-- Classes pour le cinquième cours synchrone
INSERT INTO Classes (synchronousCourseId, startTime, endTime, meetingUrl) VALUES
    (8, '2024-05-10 10:00:00', '2024-05-10 12:00:00', 'url_meeting_5_1'),
    (8, '2024-05-11 10:00:00', '2024-05-11 12:00:00', 'url_meeting_5_2'),
    (8, '2024-05-12 10:00:00', '2024-05-12 12:00:00', 'url_meeting_5_3');

-- Insertion des nouveaux utilisateurs dans la table Users
INSERT INTO Users (id) VALUES (4), (5), (6), (7), (8);

-- Insertion des nouvelles personnes dans la table Persons
INSERT INTO Persons (id, avatarUrl, firstName, lastName, pronoun, occupation) VALUES
    (4, 'url_avatar_4.jpg', 'Bob', 'Brown', 'il', 'professionnel'),
    (5, 'url_avatar_5.jpg', 'Charlie', 'Davis', 'il', 'professionnel'),
    (6, 'url_avatar_6.jpg', 'David', 'Evans', 'il', 'professionnel'),
    (7, 'url_avatar_7.jpg', 'Eve', 'Foster', 'elle', 'professionnel'),
    (8, 'url_avatar_8.jpg', 'Frank', 'Green', 'il', 'professionnel');

-- Indiquer que ces personnes sont des étudiants
INSERT INTO Students (id) VALUES (4), (5), (6), (7), (8);

-- Insertion des notes pour les cours synchrones
INSERT INTO Reviews (studentId, courseId, rating, comment) VALUES
    -- Notes pour le premier cours synchrone (Cours Synchrone 1)
    (4, 4, 5, 'Excellent cours synchrone, très interactif et bien structuré.'),
    (5, 4, 4, 'Bon cours, mais pourrait inclure plus d\'exemples.'),
    (6, 4, 5, 'Le contenu est bon, mais la présentation pourrait être améliorée.'),
    (7, 4, 4, 'Trop de théorie, manque de pratique.'),
    (8, 4, 5, 'Excellent cours.'),

    -- Notes pour le deuxième cours synchrone (Cours Synchrone 2)
    (4, 5, 4, 'Bon cours avec des explications claires.'),
    (5, 5, 4, 'Excellent ! Très utile et bien présenté.'),
    (6, 5, 3, 'Quelques parties sont difficiles à comprendre.'),
    (7, 5, 3, 'Peu de contenu pratique.'),
    (8, 5, 2, 'Pas du tout intéressant.'),

    -- Notes pour le troisième cours synchrone (Cours Synchrone 3)
    (4, 6, 3, 'Contenu correct, mais manque d\'exemples concrets.'),
    (5, 6, 4, 'Bon cours, mais la durée des sessions est trop longue.'),
    (6, 6, 3, 'Moyen.'),
    (7, 6, 2, 'Cours un peu trop technique.'),
    (8, 6, 1, 'Pas à la hauteur de mes attentes.'),

    -- Notes pour le quatrième cours synchrone (Cours Synchrone 4)
    (4, 7, 1, 'Je ne recommande pas.'),
    (5, 7, 3, 'Correct, mais pourrait être amélioré.'),
    (6, 7, 3, 'Bon contenu et bonne présentation.'),
    (7, 7, 2, 'Manque d\'exemples pratiques.'),
    (8, 7, 1, 'Pas intéressant du tout.'),

    -- Notes pour le cinquième cours synchrone (Cours Synchrone 5)
    (4, 8, 2, 'Bon cours, mais certaines parties sont un peu longues.'),
    (5, 8, 4, 'Excellent contenu et présentation.'),
    (6, 8, 3, 'Correct, mais peut être amélioré.'),
    (7, 8, 1, 'Pas assez interactif.'),
    (8, 8, 1, 'Ennuyeux et peu utile.');
