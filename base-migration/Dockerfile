FROM node:12

WORKDIR /runnerty
RUN npm install runnerty -g
COPY . /runnerty
RUN npm install
CMD [ "runnerty" ]

EXPOSE 3456/tcp