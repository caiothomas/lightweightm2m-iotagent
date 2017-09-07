FROM node:4.1
ENV HOME=/iotagentlwm2m

WORKDIR $HOME
COPY package.json $HOME/package.json
COPY . $HOME

RUN npm install

EXPOSE 4071
EXPOSE 4072
EXPOSE 5683/udp
EXPOSE 5684/udp

CMD ["node","./bin/lwm2mAgent.js"]
