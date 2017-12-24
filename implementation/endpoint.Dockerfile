FROM alpine:latest

RUN apk update && apk add python3

COPY endpoint /endpoint

RUN cd /endpoint && \
    pip3 install -r requirements.txt && \
    apk update && apk add py3-gunicorn

ENTRYPOINT cd /endpoint && \
           python3 rethinkDB.py && \
           gunicorn -b 0.0.0.0 flaskAPI:app
