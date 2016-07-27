FROM mhart/alpine-node:4.4.7

ENV DEBUG=* NODE_ENV=production

WORKDIR /app

ADD package.json ./package.json
RUN npm install

ADD VERSION ./VERSION
ADD ./tmp/build /app

ENTRYPOINT ["/usr/bin/npm"]

CMD ["run", "serve"]
