nodeModulePipeline {
  squad = "poland"
  name = "prod-wch-sdk"
  channel = "#cms-bn-ui-sdk"

  version_minor = "1"
  version_major = "9"
  nodeversion = "10"

  preBuildScript = "echo 'Nothing to install'"
  buildScript = "chmod a+x ./build.sh && sh ./build.sh"
  deploymentScript = "echo 'Nothing to publish'"

  skipStaticResourceUpdate = true
  skipIntegrationTest = true
  skipSonarQubeScan = true
  skipValidation = true

  triggerDownstream = "squad-poland/proto-sites-next-app"
}
