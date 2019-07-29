FROM buildkite/puppeteer:latest

COPY /src /app
RUN mkdir /output -pv
WORKDIR /app
VOLUME [ "/output" ]

CMD node index.js