FROM alpine:latest

RUN apk -U add python3 py3-gunicorn

COPY optimalroute /optimalroute

RUN cd /optimalroute && \
    pip3 install -r requirements.txt

ENTRYPOINT cd /optimalroute && \
           gunicorn -R -b '0.0.0.0:6000' optimalroute:app
