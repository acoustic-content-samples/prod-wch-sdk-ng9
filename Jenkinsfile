nodeModulePipeline {
  name = "prod-wch-sdk"
  version_minor = "0"
  version_major = "9"
  nodeversion = "10"

  preBuildScript = "echo 'Nothing to install'"
  buildScript = "chmod a+x ./build.sh && sh ./build.sh"
  deploymentScript = "echo 'Nothing to publish'"

  skipStaticResourceUpdate = true
  skipIntegrationTest = true
  skipSonarQubeScan = true
  skipValidation = true

  triggerDownstream = "squad-infra-boe/prod-publishing-sites-v2-ui/develop, squad-infra-boe/proto-sites-next-app, squad-infra-boe/sites-next-spa-dev, squad-infra-boe/sites-next-spa"
}
