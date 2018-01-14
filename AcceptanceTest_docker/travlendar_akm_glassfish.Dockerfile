FROM oracle/glassfish

RUN yum install -y zip unzip

COPY travlendar_entrypoint.sh /
RUN mkdir /tmpfix
COPY web.war /tmpfix
RUN cd /tmpfix && \
    unzip web.war WEB-INF/classes/META-INF/persistence.xml && \
    sed -ri "s/localhost:3306/mysql:3306/g" WEB-INF/classes/META-INF/persistence.xml && \
    zip -o web.war WEB-INF/classes/META-INF/persistence.xml && \
    mv web.war /glassfish5/glassfish/domains/domain1/autodeploy


ENTRYPOINT /travlendar_entrypoint.sh
