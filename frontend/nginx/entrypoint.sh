#!/bin/sh
set -e

: "${PORT:=80}"

envsubst '${PORT}' < /etc/nginx/templates/default.conf.tpl > /etc/nginx/conf.d/default.conf

exec nginx -g "daemon off;"
