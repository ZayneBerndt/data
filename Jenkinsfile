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
    stage('2') {
      steps {
        sh 'echo hi'
      }
    }
    stage('3') {
      steps {
        sh 'echo hi 4'
      }
    }
  }
}
