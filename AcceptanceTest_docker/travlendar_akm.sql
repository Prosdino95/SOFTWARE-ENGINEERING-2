CREATE USER 'akm'@'%' IDENTIFIED BY '50%_fuzzy_MySQL';
GRANT ALL PRIVILEGES ON *.* TO 'akm'@'%';
CREATE DATABASE akm_travlendar;
GRANT ALL PRIVILEGES ON akm_travlendar.* TO 'akm'@'%';

