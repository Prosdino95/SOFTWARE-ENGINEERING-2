from flask_cors import CORS
import flask
from login import login
from registration import registration

app = flask.Flask(__name__)
CORS(app)


@app.route('/registration', methods=['POST'])
def registration_api():
    user = flask.request.get_json()
    return registration(user)


@app.route('/login', methods=['POST'])
def login_api():
    user = flask.request.get_json()
    return login(user)


if __name__ == "__main__":
    app.run()
