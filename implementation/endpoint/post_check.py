from jsonschema import validate
from json import load


# this functions check in the json of the post is correct, load the scheme file and validete with
# jsonschema library
def registration(json):
    scheme = load(open("resource/jsonSchemes/registration.json"))
    validate(json, scheme)


def login(json):
    scheme = load(open("resource/jsonSchemes/login.json"))
    validate(json, scheme)


def mod_password(json):
    scheme = load(open("resource/jsonSchemes/mod_password_profile.json"))
    validate(json, scheme)


def preference(json):
    scheme = load(open("resource/jsonSchemes/preference.json"))
    validate(json, scheme)


def user_profile(json):
    scheme = load(open("resource/jsonSchemes/user_profile.json"))
    validate(json, scheme)


def add_event(json):
    scheme = load(open("resource/jsonSchemes/add_event.json"))
    validate(json, scheme)


def mod_event(json):
    scheme = load(open("resource/jsonSchemes/mod_event.json"))
    validate(json, scheme)


def del_event(json):
    scheme = load(open("resource/jsonSchemes/del_event.json"))
    validate(json, scheme)


def get_route(json):
    scheme = load(open("resource/jsonSchemes/route.json"))
    validate(json, scheme)


def flexible_lunch(json):
    scheme = load(open("resource/jsonSchemes/flexible_lunch.json"))
    validate(json, scheme)
