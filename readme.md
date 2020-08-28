vue-cli-service build --mode prod
docker build -t hardstylez72/fblog .
docker login
docker push hardstylez72/fblog:latest
 
