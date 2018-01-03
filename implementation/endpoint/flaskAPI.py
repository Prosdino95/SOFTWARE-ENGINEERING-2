from flask_cors import CORS
import flask
from login import login
from registration import registration
import profile
import event
import route
from flexible_lunch import set_lunch
import post_check
from jsonschema import ValidationError
import pprint

app = flask.Flask(__name__)
CORS(app)


# API for registration and login
@app.route('/registration', methods=['POST'])
def registration_api():
    user = flask.request.get_json()
    try:
        post_check.registration(user)
    except ValidationError: return "bad request"
    return registration(user)


@app.route('/login', methods=['POST'])
def login_api():
    user = flask.request.get_json()
    try:
        post_check.login(user)
    except ValidationError: return "Bad Request"
    return login(user)


# API for user's profile management
@app.route('/modProfile', methods=['POST'])
def mod_profile_api():
    user = flask.request.get_json()
    try:
        post_check.user_profile(user)
    except ValidationError: return "Bad Request"
    profile.mod_profile(user)
    return "information changed"


@app.route('/modProfilePreference', methods=['POST'])
def mod_profile_preference_api():
    user = flask.request.get_json()
    try:
        post_check.preference(user)
    except ValidationError: return "Bad Request"
    profile.mod_profile_preference(user)
    return "information changed"


@app.route('/modProfilePassword', methods=['POST'])
def mod_profile_password_api():
    user = flask.request.get_json()
    try:
        post_check.mod_password(user)
    except ValidationError: return "Bad Request"
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
    try:
        post_check.add_event(user_event)
    except ValidationError: return "Bad Request"
    event.add_event(user_event)
    return "event added"


@app.route('/modEvent', methods=['POST'])
def mod_event__api():
    user_event = flask.request.get_json()
    try:
        post_check.mod_event(user_event)
    except ValidationError: return "Bad Request"
    return event.mod_event(user_event)



@app.route('/delEvent', methods=['POST'])
def del_event__api():
    user_event = flask.request.get_json()
    try:
        post_check.del_event(user_event)
    except ValidationError: return "Bad Request"
    token = user_event["token"]
    event_id = user_event["id"]
    return event.del_event(token, event_id)



@app.route('/getEvent', methods=['GET'])
def get_event():
    token = flask.request.args.get('token', '')
    json_list = event.get_event(token)
    return flask.jsonify(json_list)


@app.route('/getRoute', methods=['POST'])
def get_route():
    ev = flask.request.get_json()
    with open('log.txt', 'a') as f:
        pprint.pprint('routing request', f)
        pprint.pprint(ev, f)
    try:
        post_check.get_route(ev)
    except ValidationError:
        return "Bad Request"
    token = ev["token"]
    gps_start = ev["gps_start"]
    gps_stop = ev["gps_stop"]
    return route.get_route(token, gps_start, gps_stop)


# API for flexible lunch
@app.route('/flexibleLunch', methods=['POST'])
def flexible_lunch_api():
    event = flask.request.get_json()
    try:
        post_check.flexible_lunch(event)
    except ValidationError: return "Bad Request"
    set_lunch(event)
    return "event added"


if __name__ == "__main__":
    app.run()
