FROM node:12-alpine

# Set the working directory to /app
RUN mkdir -p /data
RUN mkdir -p /app
# Copy the current directory contents into the container at /app
WORKDIR /app
#COPY . /app

ADD . .

# Install any needed packages specified in requirements.txt
RUN npm install -g .
#RUN npm i
#RUN npm link


CMD ["server"]
#CMD ["yarrrml-parser", "-i",  "/data/yarrrml.yaml", "-o", "/data/rmlrules.ttl"]
#ENTRYPOINT ["yarrrml-parser"]
#CMD yarrrml-parser -i $PARSERIN -o $PARSEROUT
