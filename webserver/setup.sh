#!/bin/bash

apt-get install python-pip python-bcrypt python-dev python-openssl python-requests
pip install Flask
pip install flask-login
pip install Flask-SQLAlchemy
pip install Flask-Bcrypt

openssl genrsa -des3 -passout pass:x -out ./ssl/server.pass.key 2048
openssl rsa -passin pass:x -in ./ssl/server.pass.key -out ./ssl/server.key
rm ./ssl/server.pass.key
openssl req -new -key ./ssl/server.key -out ./ssl/server.csr
openssl x509 -req -days 365 -in ./ssl/server.csr -signkey ./ssl/server.key -out ./ssl/server.crt

