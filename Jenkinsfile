pipeline {
agent any
environment {
  registry = "registry.internallab.co.uk:5000"
  registryCredential = "docker login -u jenkins -p Renegade187!"
  dockerImageTesting = docker.build registry + ":testing"
  dockerImage = docker.build registry + ":latest"
  SVC_NAME = sh(returnStdout: true, script: "echo ${env.JOB_NAME} | awk -F/ '{print \$2}'").replaceAll('\\s', '')
  project = sh(returnStdout: true, script: "echo ${env.JOB_NAME} | awk -F/ '{print \$1}'").replaceAll('\\s', '')
}
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
      when {
      expression {COMMIT_MSG =='DONE'}
      }
      script{
        sh 'npm install'
        sh 'npm test'
        sh 'JASMINE_FILE=./jenkins-test-results.lcov ./node_modules/.bin/jasmine/** --reporter jasmine-junit-reporter'
      }
    }
  }
  stage('static analysis') {
    steps {
      when {
      expression {COMMIT_MSG =='DONE'}
      }
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
