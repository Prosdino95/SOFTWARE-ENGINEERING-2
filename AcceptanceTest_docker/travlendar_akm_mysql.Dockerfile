FROM mysql

COPY travlendar_akm.sql /docker-entrypoint-initdb.d
