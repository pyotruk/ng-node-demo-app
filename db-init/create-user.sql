CREATE USER 'globaldots'@'%' IDENTIFIED WITH mysql_native_password BY '1q2w3e4r';
GRANT ALL PRIVILEGES ON globaldots_code_challenge.* TO 'globaldots'@'%';
FLUSH PRIVILEGES;
