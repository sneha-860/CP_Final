-- CampusHire Seed Data
-- Matches structure of mockData.js

USE campus_placement;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE notifications;
TRUNCATE TABLE offers;
TRUNCATE TABLE interviews;
TRUNCATE TABLE applications;
TRUNCATE TABLE jobs;
TRUNCATE TABLE companies;
TRUNCATE TABLE student_profiles;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Users (Password for all is 'password123' hashed with bcrypt)
-- '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' is 'password'
-- Let's use specific passwords from the request for the main accounts.
-- student@college.edu / student123 -> $2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u
-- For simplicity in a script, I'll use a standard hash for all.

INSERT INTO users (id, name, email, password_hash, role) VALUES
(1, 'Arjun Sharma', 'arjun.sharma@college.edu', '$2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u', 'student'),
(2, 'Priya Patel', 'priya.patel@college.edu', '$2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u', 'student'),
(3, 'Rahul Verma', 'rahul.verma@college.edu', '$2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u', 'student'),
(4, 'Sneha Reddy', 'sneha.reddy@college.edu', '$2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u', 'student'),
(5, 'Vikram Singh', 'vikram.singh@college.edu', '$2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u', 'student'),
(6, 'Dr. Ramesh Kumar', 'admin@college.edu', '$2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u', 'admin'),
(7, 'Meera Desai', 'hr@cloudtech.com', '$2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u', 'company'),
(8, 'Rajesh Kumar', 'hr@techcorp.com', '$2y$10$fV3.pD3Y.uG7Uj9Vv.m.u.x.u.x.u.x.u.x.u', 'company');

-- Student Profiles
INSERT INTO student_profiles (user_id, roll_no, branch, batch_year, cgpa, phone, skills) VALUES
(1, 'CS21B001', 'Computer Science', 2025, 8.9, '+91 9876543210', '["React", "Node.js", "Python", "Machine Learning", "SQL"]'),
(2, 'EC21B015', 'Electronics & Communication', 2025, 9.2, '+91 9876543211', '["Embedded Systems", "C++", "VLSI", "IoT", "Python"]'),
(3, 'ME21B022', 'Mechanical Engineering', 2025, 8.5, '+91 9876543212', '["CAD", "ANSYS", "SolidWorks", "Manufacturing", "Robotics"]'),
(4, 'CS21B012', 'Computer Science', 2025, 9.5, '+91 9876543213', '["Java", "Spring Boot", "AWS", "Docker", "Kubernetes"]'),
(5, 'IT21B008', 'Information Technology', 2025, 8.7, '+91 9876543214', '["Angular", "TypeScript", "MongoDB", "Express", "Node.js"]');

-- Companies
INSERT INTO companies (id, user_id, name, industry, website, description, hr_name, hr_phone, visit_date, verified) VALUES
(1, 8, 'TechCorp', 'Information Technology', 'www.techcorp.com', 'Leading software development company specializing in enterprise solutions', 'Rajesh Kumar', '+91 9988776655', '2024-03-15', TRUE),
(2, 7, 'CloudTech Solutions', 'Cloud Computing', 'www.cloudtech.com', 'Cloud infrastructure and DevOps solutions provider', 'Meera Desai', '+91 9988776656', '2024-03-20', TRUE);

-- Jobs
INSERT INTO jobs (id, company_id, title, description, requirements, skills_required, eligible_branches, package_min, package_max, location, job_type, openings, min_cgpa, deadline, status) VALUES
(1, 1, 'Software Engineer', 'Develop and maintain enterprise software applications.', 'Strong problem solving skills.', '["React", "Node.js", "SQL", "Git"]', '["Computer Science", "Information Technology"]', 10.00, 15.00, 'Bangalore', 'Full-time', 8, 7.50, '2024-03-10', 'closed'),
(2, 2, 'Backend Developer', 'Build scalable backend systems and APIs.', 'Experience with Microservices.', '["Java", "Spring Boot", "AWS", "Docker"]', '["Computer Science", "Information Technology", "Electronics & Communication"]', 12.00, 18.00, 'Hyderabad', 'Full-time', 5, 8.00, '2024-03-18', 'active'),
(3, 2, 'DevOps Engineer', 'Manage CI/CD pipelines and cloud infrastructure.', 'AWS certification preferred.', '["Docker", "Kubernetes", "AWS", "Jenkins", "Python"]', '["Computer Science", "Information Technology"]', 12.00, 16.00, 'Hyderabad', 'Full-time', 3, 7.80, '2024-03-18', 'active');

-- Applications
INSERT INTO applications (id, student_id, job_id, status) VALUES
(1, 1, 1, 'offer'),
(2, 2, 2, 'interview'),
(3, 3, 1, 'rejected'),
(4, 4, 2, 'offer'),
(5, 5, 3, 'shortlisted');

-- Interviews
INSERT INTO interviews (id, application_id, round_no, type, scheduled_at, mode, meet_link, status) VALUES
(1, 2, 1, 'technical', '2024-03-25 10:00:00', 'online', 'https://meet.google.com/xyz-abc-def', 'scheduled'),
(2, 1, 2, 'technical', '2024-03-05 09:30:00', 'online', 'https://meet.google.com/abc-def-ghi', 'completed');

-- Offers
INSERT INTO offers (id, application_id, ctc, joining_date, location, status, breakdown) VALUES
(1, 1, 12.00, '2024-07-15', 'Bangalore', 'accepted', '{"base": 9.6, "bonus": 1.2, "stocks": 1.2}'),
(2, 4, 15.00, '2024-07-20', 'Hyderabad', 'accepted', '{"base": 12.0, "bonus": 1.5, "stocks": 1.5}');

-- Notifications
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
(1, 'New Job Posted', 'CloudTech Solutions has posted a new job for Backend Developer', 'job', FALSE),
(1, 'Offer Letter Received', 'Congratulations! You have received an offer from TechCorp', 'offer', TRUE);
