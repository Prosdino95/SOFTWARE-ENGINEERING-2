FROM alpine:latest

RUN apk update && apk add python3

COPY scraper /scraper

RUN cd /scraper && \
    pip3 install -r requirements.txt && \
    apk -U add p7zip

ENTRYPOINT cd /scraper && \
           python3 scraper.py | tail -f /dev/null
