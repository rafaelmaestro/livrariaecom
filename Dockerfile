FROM node:16

#Configuracao localtime
ENV TZ=America/Sao_Paulo
RUN unlink /etc/localtime \
    && ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
    && echo $TZ > /etc/timezone
RUN apt update && apt install alien -y && \
    apt install libaio1 libaio-dev -y

WORKDIR /usr/local/app/
COPY . .
RUN npm install --no-package-lock
RUN npm run build
CMD npm run migration:run && npm run start

