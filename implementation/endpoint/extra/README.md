# HOW TO HACK

1. Register account without email checking validity:

```
curl -i -H "Content-Type: application/json" -X POST -d @fake_user.json http://localhost:5000/registration

```