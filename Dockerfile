FROM ubuntu
USER root
RUN apt-get update -qq \
    && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common 
RUN curl -sL https://deb.nodesource.com/setup_10.x | -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm
CMD [ "node", "--version" ]
CMD [ "node", "install" ]
CMD [ "node", "build" ]
CMD [ "pm2", "start","npm","--start" ]