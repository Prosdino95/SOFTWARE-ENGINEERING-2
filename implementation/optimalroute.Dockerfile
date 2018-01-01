FROM alpine:latest

RUN apk update && apk add python3

COPY optimalroute /optimalroute

RUN cd /optimalroute && \
    pip3 install -r requirements.txt && \
    apk --update add py3-gunicorn

ENTRYPOINT cd /optimalroute && \
           gunicorn -b '0.0.0.0:6000' optimalroute:app
