from flask_cors import CORS
import flask
from login import login
from registration import registration
from profile import profile_mod

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


@app.route('/profile', methods=['POST'])
def registration_api():
    user = flask.request.get_json()
    return profile_mod(user)


if __name__ == "__main__":
    app.run()
