#!/bin/bash
set -e

ROOT_PATH=$PWD
/Applications/HBuilderX.app/Contents/MacOS/cli publish --platform h5 --project uniapp

cd unpackage/dist/build/h5/static/js
sed -i s,https://api.fastshort.top,http://localhost:3000,g *.js

cd $ROOT_PATH
docker buildx build --platform linux/amd64,linux/arm64 --push -t fastshort/webapp:latest .