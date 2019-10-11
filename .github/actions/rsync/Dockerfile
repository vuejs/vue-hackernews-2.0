FROM debian:stable-20190122-slim

LABEL "maintainer"="Maximilian Held <info@maxheld.de>"
LABEL "repository"="http://github.com/maxheld83/rsync"
LABEL "homepage"="https://www.maxheld.de/rsync/"

LABEL "com.github.actions.name"="Rsync Deploy"
LABEL "com.github.actions.description"="Deploy to a remote server with rsync via ssh."
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="orange"

RUN apt-get update && \ 
apt-get install -y \ 
openssh-client \ 
rsync && \ 
rm -rf /var/lib/apt/lists/*

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
