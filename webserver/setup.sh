#!/bin/bash

apt-get install python-pip python-bcrypt python-dev python-openssl python-requests
pip install Flask
pip install flask-login
pip install Flask-SQLAlchemy
pip install Flask-Bcrypt

mkdir ./etc/ssl
mkdir ./etc/database
openssl genrsa -des3 -passout pass:x -out ./etc/ssl/server.pass.key 2048
openssl rsa -passin pass:x -in ./etc/ssl/server.pass.key -out ./etc/ssl/server.key
rm ./etc/ssl/server.pass.key
openssl req -new -key ./etc/ssl/server.key -out ./etc/ssl/server.csr
openssl x509 -req -days 365 -in ./etc/ssl/server.csr -signkey ./etc/ssl/server.key -out ./etc/ssl/server.crt

