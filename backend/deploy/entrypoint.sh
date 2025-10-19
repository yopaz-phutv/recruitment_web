#!/bin/sh
set -e

: "${PORT:=8080}"

mkdir -p /etc/nginx/http.d
envsubst '${PORT}' < /etc/nginx/templates/default.conf.tpl > /etc/nginx/http.d/default.conf

exec supervisord -c /etc/supervisord.conf
