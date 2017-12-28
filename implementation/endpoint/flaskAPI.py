from flask_cors import CORS
import flask
from login import login
from registration import registration
import profile
import event
import route
from flexible_lunch import set_lunch

app = flask.Flask(__name__)
CORS(app)


# API for registration and login
@app.route('/registration', methods=['POST'])
def registration_api():
    user = flask.request.get_json()
    return registration(user)


@app.route('/login', methods=['POST'])
def login_api():
    user = flask.request.get_json()
    return login(user)


# API for user's profile management
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


@app.route('/getProfilePreference', methods=['GET'])
def get_profile_preference_api():
    token = flask.request.args.get('token', '')
    json = profile.get_profile_preference(token)
    return flask.jsonify(json)


@app.route('/getProfile', methods=['GET'])
def get_profile_api():
    token = flask.request.args.get('token', '')
    json = profile.get_profile(token)
    del json["password"]
    return flask.jsonify(profile=json)


# API for events management
@app.route('/addEvent', methods=['POST'])
def add_event__api():
    user_event = flask.request.get_json()
    event.add_event(user_event)
    return "event added"


@app.route('/modEvent', methods=['POST'])
def mod_event__api():
    user_event = flask.request.get_json()
    event.mod_event(user_event)
    return "event modified"


@app.route('/delEvent', methods=['POST'])
def del_event__api():
    ev = flask.request.get_json()
    token = ev["token"]
    event_id = ev["id"]
    event.del_event(token, event_id)
    return "event deleted"


@app.route('/getEvent', methods=['GET'])
def get_event():
    token = flask.request.args.get('token', '')
    json_list = event.get_event(token)
    return flask.jsonify(json_list)


@app.route('/getRoute', methods=['POST'])
def get_route():
    ev = flask.request.get_json()
    token = ev["token"]
    gps_start = ev["gps_start"]
    gps_stop = ev["gps_stop"]
    return route.get_route(token, gps_start, gps_stop)


# API for flexible lunch
@app.route('/flexibleLunch', methods=['POST'])
def registration_api():
    user = flask.request.get_json()
    return set_lunch(user)


if __name__ == "__main__":
    app.run()
