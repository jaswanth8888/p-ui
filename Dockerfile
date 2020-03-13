FROM ubuntu
USER root
RUN apt-get update -qq \
    && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common 
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN sh "npm --version"
RUN sh "npm install"
RUN sh "npm build"
RUN sh "pm2 start npm -- start"
CMD [ "node", "--version" ]
CMD [ "node", "install" ]
CMD [ "node", "build" ]
CMD [ "pm2", "start","npm","--start" ]