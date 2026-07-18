DROP DATABASE IF EXISTS registrationdb;
CREATE DATABASE registrationdb;
USE registrationdb;

-- =========================
-- Student Table
-- =========================
CREATE TABLE student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

-- =========================
-- User Login Table
-- =========================
CREATE TABLE user_account (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    student_id INT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);

-- =========================
-- Course Table
-- title = course code, such as CMSC 495
-- description = course name/title
-- =========================
CREATE TABLE course (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    credits INT NOT NULL
);

-- =========================
-- Section Table
-- =========================
CREATE TABLE section (
    section_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    schedule VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    enrolled_count INT DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- =========================
-- Enrollment Table
-- =========================
CREATE TABLE enrollment (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    section_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (section_id) REFERENCES section(section_id),
    UNIQUE KEY unique_active_enrollment (student_id, section_id, status)
);

-- =========================
-- Course Prerequisite Table
-- Stores which courses are required before another course
-- =========================
CREATE TABLE course_prerequisite (
    course_id INT NOT NULL,
    prerequisite_course_id INT NOT NULL,
    PRIMARY KEY (course_id, prerequisite_course_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (prerequisite_course_id) REFERENCES course(course_id)
);

-- =========================
-- Completed Course Table
-- Stores which courses a student has already completed
-- =========================
CREATE TABLE completed_course (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- =========================
-- Sample Students
-- =========================
INSERT INTO student (first_name, last_name, email)
VALUES
('Mary', 'Washington', 'mary.washington@example.com'),
('Jane', 'Smith', 'jane.smith@example.com');

-- =========================
-- Sample User Accounts
-- Student accounts are linked to student_id.
-- Admin accounts have NULL student_id.
-- =========================
INSERT INTO user_account (username, password, role, student_id)
VALUES
('MaryWashington', 'Student123!', 'student', 1),
('JaneSmith', 'Student456!', 'student', 2),
('AdminUser', 'Admin123!', 'admin', NULL),
('admin1', 'Admin123!', 'admin', NULL);

-- =========================
-- Sample Courses
-- title = course code
-- description = course name
-- =========================
INSERT INTO course (title, description, credits)
VALUES
('CMSC 495', 'Computer Science Capstone', 3),
('CMSC 335', 'Object-Oriented and Concurrent Programming', 3),
('CMSC 345', 'Software Engineering Principles and Techniques', 3),
('CMIS 320', 'Relational Database Concepts and Applications', 3);

-- =========================
-- Sample Sections
-- course_id values match the inserted courses above:
-- 1 = CMSC 495
-- 2 = CMSC 335
-- 3 = CMSC 345
-- 4 = CMIS 320
-- =========================
INSERT INTO section (course_id, schedule, capacity, enrolled_count)
VALUES
(1, 'Online', 25, 19),
(2, 'Online', 20, 18),
(3, 'Online', 30, 12),
(4, 'Online', 50, 16);

-- =========================
-- Sample Prerequisites
-- CMSC 495 requires CMSC 335 and CMSC 345
-- =========================
INSERT INTO course_prerequisite (course_id, prerequisite_course_id)
VALUES
(1, 2),
(1, 3);

-- =========================
-- Sample Completed Courses
-- MaryWashington completed CMSC 335 only.
-- Therefore, MaryWashington should NOT be able to enroll in CMSC 495 yet.
-- =========================
INSERT INTO completed_course (student_id, course_id)
VALUES
(1, 2);

-- JaneSmith completed CMSC 335 and CMSC 345.
-- Therefore, JaneSmith SHOULD be able to enroll in CMSC 495.
INSERT INTO completed_course (student_id, course_id)
VALUES
(2, 2),
(2, 3);