#!/bin/bash

IMAGE_NAME=${IMAGE_NAME:-nginx:1.21.6-alpine}
NAME=${CONTAINER:-toobz-web}
DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "===> Starting $NAME..."
echo ""
echo "Cleaning up..."
echo ""
docker kill $NAME
docker rm $NAME

echo ""
echo "  Reading the environment from .env-container"
echo "  and then starting the web server container"
echo ""

# build up the list of environment variables to pass to the container
for pair in $(grep -v '^#' .env-container | xargs); do
	key=$(echo $pair | cut -d'=' -f1)
	val=$(echo $pair | cut -d'=' -f2)
	envlist="$envlist -e $key=$val"
    printf -v "$key" '%s' $val
    echo "  read $key / $val"
done;

echo ""
echo "Starting service..."
echo "  Name: $NAME"
echo "  Port: $PORT (host), 443 (container)"
echo "  SSL certfile: $SSL_CERTFILE"
echo "  SSL keyfile: $SSL_KEYFILE"
echo ""
docker run --name $NAME \
    $envlist \
	-v $DIR/docker/default.conf:/etc/nginx/conf.d/default.conf \
	-v $DIR/$SSL_CERTFILE:/etc/nginx/ssl/servercert.pem:ro \
	-v $DIR/$SSL_KEYFILE:/etc/nginx/ssl/serverkey.pem:ro \
	-v $DIR/dist:/usr/share/nginx/html:ro \
    -p "$PORT:443" \
    -d $IMAGE_NAME

echo ""
echo "Done."
