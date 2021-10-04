nodeModulePipeline {
  name = "prod-wch-sdk"
  version_minor = "0"
  version_major = "9"
  nodeversion = "12"

  preBuildScript = "echo 'Nothing to install'"
  buildScript = "chmod a+x ./build.sh && sh ./build.sh"
  deploymentScript = "echo 'Nothing to publish'"

  skipStaticResourceUpdate = true
  skipIntegrationTest = true
  skipSonarQubeScan = true
  skipValidation = true

  squad = 'squad-poland'
  channel = "#cms-bn-shell-build-status"

  triggerDownstream = "${squad}/sites-next-spa-dev, ${squad}/sites-next-spa"
}
