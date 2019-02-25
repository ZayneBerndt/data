pipeline {
  agent any
stages {
  stage('Check Commit') {
    steps {
      script{
        COMMIT_MSG = sh(returnStdout: true, script: "git log -1 --pretty=oneline | awk '{print \$2}' | tr -d '\n'")
      }
    }
  }
  stage('Unit Tests') {
    steps {
      script{
        sh 'npm install'
        sh 'npm test'
        sh 'JASMINE_FILE=./jenkins-test-results.lcov ./node_modules/.bin/jasmine/** --reporter jasmine-junit-reporter'
      }
    }
  }
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
      when {
      expression {COMMIT_MSG =='DONE'}
      }
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
  stage('build and push test') {
    steps {
      when {
      expression {COMMIT_MSG =='DONE'}
      }
      script {
        sh dockerImageTesting
        sh docker.withRegistry( '', registryCredential ) {dockerImage.push()}
      }
    }
  }
  stage('build and push latest') {
    steps {
      when {
      expression {COMMIT_MSG =='DONE'}
      }
      script {
        sh dockerImage
        sh docker.withRegistry( '', registryCredential ) {dockerImage.push()}
        sh "docker rmi $registry:latest"
      }
    }
  }
}
}
