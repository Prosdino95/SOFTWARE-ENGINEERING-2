FROM alpine:latest

RUN apk -U add python3 p7zip

COPY scraper /scraper

RUN cd /scraper && \
    pip3 install -r requirements.txt

ENTRYPOINT cd /scraper && \
           python3 scraper.py
