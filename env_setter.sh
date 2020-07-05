#!/bin/bash
rm .env
if [ $1 = "production" ]
then
    touch .env
    echo "MOBILE_NODE_ENV=production" >> .env
elif [ $1 = "staging" ]
then 
    touch .env
    echo "MOBILE_NODE_ENV=staging" >> .env
elif [ $1 = "local" ]
then
    touch .env
    echo "MOBILE_NODE_ENV=local" >> .env 
    ip=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')
    ipLocal=($ip)
    echo "MOBILE_IP=${ipLocal[0]}" >> .env
fi
