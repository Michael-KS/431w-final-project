DROP DATABASE IF EXISTS outing_app;
CREATE DATABASE outing_app;
USE outing_app;

CREATE TABLE Profile(
Email VARCHAR(40),
Username VARCHAR(30),
Password VARCHAR(30),
Location VARCHAR(50),
Gender CHAR(1), -- single letters like 'M', 'F', or 'O'
PRIMARY KEY(email)
);


CREATE TABLE Category (
    Cat_id INTEGER AUTO_INCREMENT,
    Description VARCHAR(100),
    Suited_for CHAR(1), -- single letters like 'C' for couples or 'S' for Single
    PRIMARY KEY (cat_id)
);


CREATE TABLE Interest (
    In_id INTEGER AUTO_INCREMENT,
    Name VARCHAR(30) UNIQUE NOT NULL,
    Cat_id INTEGER NOT NULL,
    PRIMARY KEY(In_id),
    FOREIGN KEY(Cat_id) REFERENCES Category(Cat_id)
);


CREATE TABLE ProfileInterest (
    Email VARCHAR(40) NOT NULL,
    In_id INTEGER NOT NULL,
    PRIMARY KEY (Email,In_id),
    FOREIGN KEY (Email) REFERENCES Profile(Email) ON DELETE CASCADE,
    FOREIGN KEY (In_id) REFERENCES Interest(In_id) ON DELETE CASCADE
);

CREATE TABLE Location(
Loc_id INTEGER AUTO_INCREMENT,
Name VARCHAR(100),
Address VARCHAR(255),
PRIMARY KEY(loc_id)
);

CREATE TABLE Activity(
Act_id INTEGER AUTO_INCREMENT,
Loc_id INTEGER NOT NULL,
Title VARCHAR(100),
Duration DECIMAL(4,2),
Price DECIMAL(5,2),
Cat_id INTEGER,
PRIMARY KEY(act_id),
FOREIGN KEY(loc_id) REFERENCES Location(loc_id) ON DELETE CASCADE,
FOREIGN KEY(cat_id) REFERENCES Category(cat_id) ON DELETE CASCADE
);

CREATE TABLE Event(
E_id INTEGER AUTO_INCREMENT,
Date DATETIME,
Status CHAR(1), -- stuff like 'C' for complete or 'P' for planned
Act_id INTEGER NOT NULL,
Host_email VARCHAR(50) NOT NULL,
PRIMARY KEY(e_id),
FOREIGN KEY(act_id) REFERENCES Activity(act_id) ON DELETE CASCADE,
FOREIGN KEY(host_email) REFERENCES Profile(email) ON DELETE CASCADE
);

CREATE TABLE Participants(
Email VARCHAR(50) NOT NULL,
E_id INTEGER NOT NULL,
PRIMARY KEY(email, e_id),
FOREIGN KEY(email) REFERENCES Profile(email) ON DELETE CASCADE,
FOREIGN KEY(e_id) REFERENCES Event(e_id) ON DELETE CASCADE
);


CREATE TABLE Review(
Rev_id INTEGER AUTO_INCREMENT,
Author_email VARCHAR(50) NOT NULL,
Star_level DECIMAL(1,0) CHECK (star_level BETWEEN 0 AND 5),
E_id INTEGER NOT NULL,
Description VARCHAR(200),
PRIMARY KEY(rev_id),
FOREIGN KEY(author_email) REFERENCES Profile(email) ON DELETE CASCADE,
FOREIGN KEY(e_id) REFERENCES Event(e_id) ON DELETE CASCADE
);

CREATE INDEX idx_user_email_password ON Profile(email, password); -- for func 1

CREATE INDEX idx_activity_cat_id ON Activity(cat_id); -- for func 3, 4, 5

CREATE INDEX idx_activity_price_duration ON Activity(cat_id, price, duration); -- for func 5

CREATE INDEX idx_event_host_email ON Event(host_email); -- for func 7

CREATE INDEX idx_participants_email ON Participants(email); -- for func 7

CREATE INDEX idx_review_eid ON Review(e_id); -- for func 8


