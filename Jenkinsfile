pipeline {
  agent any
  stages {
    stage('static analysis') {
      steps {
        script {
          def scannerHome = tool name: 'Zayne Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
            withSonarQubeEnv('Prod') {
            sh "${scannerHome}/bin/sonar-scanner"
          }
         }
       }
      }
    stage('SonqarQualityGate') {
      steps {
        script {
          timeout(time: 1, unit: 'HOURS') {
              def qg = waitForQualityGate()
              if (qg.status != 'OK') {
                  error "Pipeline aborted due to quality gate failure: ${qg.status}"
              }
          }
        }
      }
    }
    stage('3') {
      steps {
        sh 'echo hi 4'
      }
    }
  }
}
