#!/bin/bash
rm -rf .env
if [ "$1" = "production" ]
then
    touch .env
    echo "MOBILE_NODE_ENV=production" >> .env
elif [ "$1" = "staging" ]
then
    touch .env
    echo "MOBILE_NODE_ENV=staging" >> .env
elif [ "$1" = "local" ]
then
    touch .env
    echo "MOBILE_NODE_ENV=local" >> .env
    # localIps=$(ip address show | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')
    ipLocal="$(ip -o route get to 8.8.8.8 | sed -n 's/.*src \([0-9.]\+\).*/\1/p')"
    echo "MOBILE_IP=${ipLocal}" >> .env
fi
