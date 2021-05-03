-- ==================================================================================================
-- Student Management System

DROP DATABASE IF EXISTS db_student;
CREATE DATABASE db_student;
USE db_student;

-- DDL Queries
CREATE TABLE IF NOT EXISTS courses (
	course_id INT primary key,
    course_name varchar(20) NOT NULL, 
    sem INT NOT NULL, 
    year int
);

CREATE TABLE IF NOT EXISTS users (
	erp INT PRIMARY KEY,
    password varchar(20) NOT NULL,
    email_id varchar(20) NOT NULL UNIQUE 
);

CREATE TABLE IF NOT EXISTS department (
	dept_id INT primary key,
    dept_name varchar(20) NOT NULL
);


CREATE TABLE IF NOT EXISTS faculty (
	erp INT PRIMARY KEY NOT NULL,
	course_id INT NOT NULL,
	dept_id INT NOT NULL, 
    name varchar(20) NOT NULL,
    Foreign Key (course_id) references courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE, 
    Foreign Key (dept_id) references department(dept_id)  ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS student (
	erp INT PRIMARY KEY,
    course_id INT NOT NULL,
    name varchar(20) NOT NULL,
    roll_no INT NOT NULL,
    Foreign key(course_id) references courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    Foreign key(erp) references users(erp) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Attendance for students only
create table IF NOT EXISTS attendance ( 
    attendance_id INT PRIMARY KEY,
    erp INT,
    course_id INT NOT NULL,
    days_attended INT NOT NULL DEFAULT 0,
    Foreign key (course_id) references courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    Foreign key (erp) references student(erp) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS fees (		
	transaction_id INT PRIMARY KEY,
	erp INT NOT NULL,
	transaction_amount float NOT NULL CHECK (transaction_amount > 0), 
	Foreign key(erp) references users(erp) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS exam (
	exam_id INT PRIMARY KEY,
	erp INT NOT NULL,
    course_id INT NOT NULL,
    marks float NOT NULL DEFAULT 0,
	exam_fee float NOT NULL DEFAULT 500 CHECK (exam_fee < 2000), 
    exam_type varchar(10) NOT NULL, 
    Foreign key (course_id) references courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    Foreign key (erp) references users(erp) ON DELETE CASCADE ON UPDATE CASCADE
);

SHOW TABLES;

-- Triggers
DELIMITER $$
CREATE TRIGGER insert_attendance
AFTER INSERT ON student
FOR EACH ROW
BEGIN
  IF NOT EXISTS (select * from attendance where erp=new.erp) THEN
    insert INTO attendance values (new.erp%100,new.erp,new.course_id,0);
END IF;
END$$
DELIMITER ;

-- DML QUERIES
-- Courses
INSERT INTO courses VALUES (1001,"Physics",01,2011);
INSERT INTO courses VALUES (1002,"DBMS",01,2011);
INSERT INTO courses VALUES (1003,"MIT",01,2011);
INSERT INTO courses VALUES (1004,"DELD",01,2011);
INSERT INTO courses VALUES (1005,"Humanity",01,2011);
-- Student
INSERT INTO users VALUES (103218001,"password","as@gmail.com");
INSERT INTO users VALUES (103218002,"password","bs@gmail.com");
INSERT INTO users VALUES (103218003,"password","cs@gmail.com");
INSERT INTO users VALUES (103218004,"password","ds@gmail.com");
INSERT INTO users VALUES (103218005,"password","es@gmail.com");
-- Teachers
INSERT INTO users VALUES (13218001,"password","john@gmail.com");
INSERT INTO users VALUES (13218003,"password","hp@gmail.com"); 
INSERT INTO users VALUES (13218005,"password","goblin@gmail.com"); 
INSERT INTO users VALUES (13218007,"password","bjp@gmail.com");
-- Departments
INSERT INTO department VALUES (01,"Engineering");
INSERT INTO department VALUES (02,"Pure Science");
INSERT INTO department VALUES (03,"Arts");
INSERT INTO department VALUES (04,"Humanities");
INSERT INTO department VALUES (05,"Politics");
INSERT INTO department VALUES (06,"Music");
INSERT INTO department VALUES (07,"Commerce");
-- Faculty
INSERT INTO faculty VALUES (13218001,1001,01,"John Wick"); 
INSERT INTO faculty VALUES (13218003,1002,02,"Harry Potter");
INSERT INTO faculty VALUES (13218005,1003,07,"Goblin");
INSERT INTO faculty VALUES (13218007,1004,05,"Narendra Modi");
-- Student
INSERT INTO student VALUES (103218001,1001,"Clone - 11",21);
INSERT INTO student VALUES (103218002,1001,"Clone - 12",22);
INSERT INTO student VALUES (103218003,1001,"Clone - 13",23);
INSERT INTO student VALUES (103218004,1001,"Clone - 14",24);

-- Procedure
DELIMITER $$
CREATE PROCEDURE ins_exam()
    BEGIN
        DECLARE DONE INT DEFAULT 0;
        DECLARE CR_ID INT DEFAULT 0;
        DECLARE ST_ID INT DEFAULT 0;
        DECLARE S_NAME VARCHAR(20);
        DECLARE SEM INT;
        DECLARE YR DECIMAL(10,3);
        DECLARE CU1 CURSOR FOR SELECT course_name, sem, year FROM courses;
        DECLARE CU2 CURSOR FOR SELECT erp, course_id FROM student;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET DONE = 1;

        OPEN CU1;
        OPEN CU2;
        REPEAT
            FETCH CU1 INTO S_NAME,SEM,YR;
            FETCH CU2 INTO ST_ID, CR_ID;
            IF NOT EXISTS(SELECT * FROM exam WHERE erp = ST_ID) THEN
                IF NOT EXISTS(SELECT exam_id FROM exam WHERE exam_id = (CR_ID%100) + (ST_ID%10)) THEN
                    INSERT INTO exam VALUES ((CR_ID%100) + (ST_ID%10),ST_ID,CR_ID,0,500,"Subjective");
                END IF;
            END IF;
        UNTIL DONE -- Till Done = 1
        END REPEAT;
    END $$
DELIMITER ;
-- Debug Procedure
SELECT * FROM exam;
call ins_exam();
SELECT * FROM exam;
