from jsonschema import validate
from json import load


def registration(json):
    schema = load(open("resource/jsonSchemes/registration.json"))
    validate(json, schema)


def login(json):
    schema = load(open("resource/jsonSchemes/login.json"))
    validate(json, schema)


def mod_password(json):
    schema = load(open("resource/jsonSchemes/mod_password_profile.json"))
    validate(json, schema)


def preference(json):
    schema = load(open("resource/jsonSchemes/preference.json"))
    validate(json, schema)


def user_profile(json):
    schema = load(open("resource/jsonSchemes/user_profile.json"))
    validate(json, schema)


def add_event(json):
    schema = load(open("resource/jsonSchemes/add_event.json"))
    validate(json, schema)


def mod_event(json):
    schema = load(open("resource/jsonSchemes/mod_event.json"))
    validate(json, schema)


def del_event(json):
    schema = load(open("resource/jsonSchemes/del_event.json"))
    validate(json, schema)


def get_route(json):
    schema = load(open("resource/jsonSchemes/route.json"))
    validate(json, schema)


def flexible_lunch(json):
    schema = load(open("resource/jsonSchemes/flexible_lunch.json"))
    validate(json, schema)
