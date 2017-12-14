from flask_cors import CORS
import flask
from login import login
from registration import registration
import profile

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


@app.route('/modProfile', methods=['POST'])
def mod_profile_api():
    user = flask.request.get_json()
    profile.mod_profile(user)
    return "information changed"


@app.route('/modProfilePreference', methods=['POST'])
def mod_profile_preference_api():
    user = flask.request.get_json()
    profile.mod_profile_preference(user)
    return "information changed"


@app.route('/modProfilePassword', methods=['POST'])
def mod_profile_password_api():
    user = flask.request.get_json()
    return profile.mod_profile_password(user)


@app.route('/getProfile', methods=['GET'])
def get_profile_api():
    token = flask.request.args.get('token', '')
    json = profile.get_profile(token)
    del json["password"]
    return flask.jsonify(profile=json)


@app.route('/getProfilePreference', methods=['GET'])
def get_profile_preference_api():
    token = flask.request.args.get('token', '')
    json = profile.get_profile_preference(token)
    return flask.jsonify(json)


if __name__ == "__main__":
    app.run()
