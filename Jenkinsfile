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

  squad = this.env.JENKINS_URL.contains('acoustic') ? 'squad-poland' : 'squad-infra-boe';

  triggerDownstream = "${squad}/sites-next-spa-dev, ${squad}/sites-next-spa"
}
