#!/bin/bash
export NPMRC=$(base64 -i ~/.npmrc -w 0)

docker run --mount type=bind,source=$WORKSPACE,target=/src,readonly -e NPMRC -e VERSION_STRING -e BRANCH_NAME -e BUILD_VERSION $DOCKER_REPO/tools-buildpipeline-build-ng9-monorep:latest
