FROM alpine:latest

RUN apk -U add python3 py3-gunicorn

COPY endpoint /endpoint

RUN cd /endpoint && \
    pip3 install -r requirements.txt

ENTRYPOINT cd /endpoint && \
           python3 rethinkDB.py && \
           gunicorn -b 0.0.0.0 flaskAPI:app
