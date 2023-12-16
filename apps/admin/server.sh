#!/bin/bash
set -e

SERVER_IP="43.228.182.161"
ROOT_PATH="/www/wwwroot/admin.ai2app.xyz/"
DIST=dist/*
MSG="deploy admin prod ..."
echo $MSG
# scp -r $DIST root@$SERVER_IP:$ROOT_PATH
rsync -vahrP --info=progress2 $DIST root@$SERVER_IP:$ROOT_PATH

ssh root@$SERVER_IP "chmod -Rf 755 $ROOT_PATH && chown -Rf www:www $ROOT_PATH"
