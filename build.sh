#!/bin/bash
docker run --mount type=bind,source=$WORKSPACE,target=/src,readonly -e VERSION_STRING=$VERSION_STRING -e BRANCH_NAME=$BRANCH_NAME -e BUILD_VERSION=$BUILD_VERSION docker-repo.dxdev.ibm.com/tools-buildpipeline-build-ng9-monorep:latest
