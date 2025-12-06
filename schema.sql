CREATE TABLE User(
Email VARCHAR(40),
Username VARCHAR(30),
Password VARCHAR(30),
Location VARCHAR(50),
Gender CHAR(1), --single letters like ‘M’, ‘F’, or ‘O’
PRIMARY KEY(email)
);

CREATE TABLE NameToCategory (
    Name VARCHAR(20),
    Cat_id INTEGER NOT NULL,
    PRIMARY KEY(Name),
    FOREIGN KEY(Cat_id) REFERENCES Category(cat_id)
);

CREATE TABLE InterestsToName (
    In_id INTEGER,
    Name VARCHAR(20) NOT NULL,
    PRIMARY KEY(In_id),
    FOREIGN KEY(Name) REFERENCES InterestCategory(Name)
);

CREATE TABLE HasInterest(
Email VARCHAR(50),
In_id INTEGER,
PRIMARY KEY(email, in_id),
FOREIGN KEY(email) REFERENCES User(email),
FOREIGN KEY(in_id) REFERENCES Interests(in_id)
);

CREATE TABLE Category (
Cat_id INTEGER,
Desc VARCHAR(100),
Suited_for CHAR(1), --single letters like ‘C’ for couples or ‘S’ for Single
PRIMARY KEY (cat_id)
);

CREATE TABLE Activity(
Act_id INTEGER,
Loc_id INTEGER NOT NULL,
Title VARCHAR(100),
Duration DECIMAL(4,2),
Price DECIMAL(5,2),
Cat_id INTEGER,
PRIMARY KEY(act_id),
FOREIGN KEY(loc_id) REFERENCES Location(loc_id),
FOREIGN KEY(cat_id) REFERENCES Category(cat_id)
);

CREATE TABLE Location(
Loc_id INTEGER,
Name VARCHAR(100),
Address VARCHAR(255),
PRIMARY KEY(loc_id)
);

CREATE TABLE Participants(
Email VARCHAR(50) NOT NULL,
E_id INTEGER NOT NULL,
PRIMARY KEY(email, e_id),
FOREIGN KEY(email) REFERENCES User(email),
FOREIGN KEY(e_id) REFERENCES Event(e_id)
);

CREATE TABLE Event(
E_id INTEGER,
Date DATETIME,
Status CHAR(1), --stuff like ‘C’ for complete or ‘P’ for planned
Act_id INTEGER NOT NULL,
Host_email VARCHAR(50) NOT NULL,
PRIMARY KEY(e_id),
FOREIGN KEY(act_id) REFERENCES Activity(act_id),
FOREIGN KEY(host_email) REFERENCES User(email)
);

CREATE TABLE Review(
Rev_id INTEGER,
Author_email VARCHAR(50) NOT NULL,
Star_level DECIMAL(1,0) CHECK (star_level BETWEEN 0 AND 5),
E_id INTEGER NOT NULL,
Desc VARCHAR(200),
PRIMARY KEY(rev_id),
FOREIGN KEY(author_email) REFERENCES User(email),
FOREIGN KEY(e_id) REFERENCES Event(e_id)
);

CREATE INDEX idx_user_email_password ON User(email, password); --for func 1

CREATE INDEX idx_activity_cat_id ON Activity(cat_id); --for func 3, 4, 5

CREATE INDEX idx_activity_price_duration Activity(cat_id, price, duration); --for func 5

CREATE INDEX idx_event_host_email ON Event(host_email); --for func 7

CREATE INDEX idx_participants_email ON Participants(email); --for func 7

CREATE INDEX idx_review_eid ON Review(e_id); --for func 8

CREATE INDEX idx_hasinterest_email ON HasInterest(email); --for func 2 and 10
