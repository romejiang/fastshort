#!/bin/bash
set -e

SERVER_IP="43.228.182.161"
ROOT_PATH="/www/wwwroot/h5.ai2app.xyz/"
DIST=unpackage/dist/build/h5/*
MSG="deploy prod ..."
echo $MSG
# scp -r $DIST root@$SERVER_IP:$ROOT_PATH

rsync -vahrP --info=progress2 unpackage/dist/build/h5 root@43.228.182.161:/www/wwwroot/h5.ai2app.xyz

ssh root@$SERVER_IP "chmod -Rf 755 $ROOT_PATH && chown -Rf www:www $ROOT_PATH"
