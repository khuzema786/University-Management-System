-- ==================================================================================================
-- Teacher Managment System

DROP DATABASE IF EXISTS db_teacher;
CREATE DATABASE db_teacher;
USE db_teacher;

-- DDL Queries
CREATE TABLE IF NOT EXISTS department(
    dept_id INT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS staff(	 
    erp INT(12) PRIMARY KEY,
    dept_id INT NOT NULL,
    name VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    email_id VARCHAR(30) NOT NULL UNIQUE,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS attendance(
    attendance_id INT PRIMARY KEY,
    erp INT NOT NULL,
    meetings_attended INT NOT NULL DEFAULT 0,
    days_attended INT NOT NULL DEFAULT 0,
    FOREIGN KEY (erp) REFERENCES staff(erp) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS salary(
    erp INT PRIMARY KEY,
    provident_fund INT,
    net_amt DECIMAL(10,3) CHECK (net_amt > 100)
);



CREATE TABLE IF NOT EXISTS courses(
    course_id INT PRIMARY KEY,
    course_name VARCHAR(20) NOT NULL,
    completion_time INT NOT NULL DEFAULT 4
);


CREATE TABLE IF NOT EXISTS teaching_staff(
    erp INT PRIMARY KEY,
    course_id INT NOT NULL,
    designation VARCHAR(20) NOT NULL,
	FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS non_teaching_staff(
    erp INT NOT NULL,
    classification VARCHAR(20) NOT NULL
);


CREATE TABLE IF NOT EXISTS roles(
    role_id INT PRIMARY KEY,
    erp INT NOT NULL,
    role_name VARCHAR(20) NOT NULL,
    FOREIGN KEY (erp) REFERENCES staff(erp) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS student(
    stud_erp INT PRIMARY KEY,
    course_id INT NOT NULL,
    name VARCHAR(20) NOT NULL,
    roll_no INT NOT NULL UNIQUE,
	FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Triggers
-- TRIGGER FOR ATTENDANCE
DELIMITER $$
CREATE TRIGGER dns_attendance
AFTER INSERT ON staff
FOR EACH ROW
BEGIN
  IF NOT EXISTS (select * from attendance where erp=new.erp) THEN
    insert INTO attendance values (new.erp%100, new.erp, 0, 0);
  END IF;
  IF NOT EXISTS (select * from salary where erp=new.erp) THEN
    insert INTO salary values (new.erp, 0,100);
  END IF;
END$$
DELIMITER ;

-- DML Queries

-- Departments
INSERT INTO department VALUES (01,"Engineering");
INSERT INTO department VALUES (02,"Pure Science");
INSERT INTO department VALUES (03,"Arts");
INSERT INTO department VALUES (04,"Humanities");
INSERT INTO department VALUES (05,"Politics");
INSERT INTO department VALUES (06,"Music");
INSERT INTO department VALUES (07,"Commerce");
-- Staff 
INSERT INTO staff VALUES (13218001, 01, "John Wick", "password","john@gmail.com");
INSERT INTO staff VALUES (13218003,02,"Harry Potter","password","ohn@gmail.com");
INSERT INTO staff VALUES (13218005,07,"Goblin","password","johdhn@gmail.com");
INSERT INTO staff VALUES (13218007,05,"Narendra Modi","password","johhn@gmail.com");

INSERT INTO staff VALUES (13218002,01,"Winston","password","jon@gmail.com");
INSERT INTO staff VALUES (13218004,02,"Filch","password","jhdhn@gmail.com");
INSERT INTO staff VALUES (13218006,07,"dragon","password","johhfn@gmail.com");
-- Courses
INSERT INTO courses VALUES (1001,"Physics",4);
INSERT INTO courses VALUES (1002,"DBMS",4);
INSERT INTO courses VALUES (1003,"MIT",4);
INSERT INTO courses VALUES (1004,"DELD",4);
INSERT INTO courses VALUES (1005,"Humanity",4);
-- Teaching Staff
INSERT INTO teaching_staff VALUES (13218001,1001,"Hitman Pro Max");
INSERT INTO teaching_staff VALUES (13218003,1002,"Auror");
INSERT INTO teaching_staff VALUES (13218005,1005,"Professional Retard");
INSERT INTO teaching_staff VALUES (13218007,1004,"CKMKB");
-- Non Teaching Staff
INSERT INTO non_teaching_staff VALUES (13218002,"Hotel Managment");
INSERT INTO non_teaching_staff VALUES (13218004,"Care Taker");
INSERT INTO non_teaching_staff VALUES (13218006,"Coin Eater");
-- Roles
INSERT INTO roles VALUES (001,13218002,"Managment");
INSERT INTO roles VALUES (002,13218004,"Managment");
INSERT INTO roles VALUES (003,13218006,"Coin Eater");
-- Students
INSERT INTO student VALUES (103218001,1001,"Clone - 1",11);
INSERT INTO student VALUES (103218002,1001,"Clone - 2",12);
INSERT INTO student VALUES (103218003,1001,"Clone - 3",13);
INSERT INTO student VALUES (103218004,1001,"Clone - 4",14);
INSERT INTO student VALUES (103218005,1001,"Clone - 5", 15);

-- Procedure
DELIMITER $$
CREATE PROCEDURE inc_sal()
    BEGIN
        DECLARE DONE INT DEFAULT 0;
        DECLARE ERP INT;
        DECLARE P_FUND INT;
        DECLARE NET_AMT DECIMAL(10,3);
        DECLARE UPD_AMT DOUBLE(10,3);
        DECLARE CU1 CURSOR FOR SELECT * FROM salary;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET DONE = 1;
        
        OPEN CU1;
        REPEAT
            FETCH CU1 INTO ERP,P_FUND,NET_AMT;
            SET UPD_AMT = NET_AMT + NET_AMT*0.25;
            UPDATE salary SET net_amt = UPD_AMT WHERE erp = ERP;
        UNTIL DONE
        END REPEAT;
    END $$
DELIMITER ;
-- Debug Procedure
SELECT * FROM salary;
CALL inc_sal();
SELECT * FROM salary;
