import os

ip = os.environ.get('RETHINKDB_IP', '127.0.0.1')
port = os.environ.get('RETHINKDB_PORT', 28015)
db_name = 'Travlendar'
