#!/bin/bash
docker run --mount type=bind,source=$WORKSPACE,target=/src,readonly -e VERSION_STRING=$VERSION_STRING  -e ibm_wch_sdk_cli_username=$KEYSTORE1_ID -e ibm_wch_sdk_cli_password=$KEYSTORE1_VALUE -e artifactory_username=$KEYSTORE2_ID -e artifactory_password=$KEYSTORE2_VALUE docker-repo.dxdev.ibm.com/tools-buildpipeline-build-ng9-app:latest
