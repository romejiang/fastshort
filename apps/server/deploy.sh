#!/bin/bash

if [ ! -z $1 ]; then
    echo "deploy st..."
    ssh -p 2222 root@59.110.229.203 '~/server.sh'
else
    echo "deploy prod..."
    ssh -p 2222 root@39.105.132.219 '~/server.sh'
fi
