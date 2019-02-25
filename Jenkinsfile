pipeline {
  agent any
stages {
  stage('Check Commit') {
    steps {
      script{
        COMMIT_MSG = sh(returnStdout: true, script: "git log -1 --pretty=oneline | awk '{print \$2}' | tr -d '\n'")
        echo COMMIT_MSG
      }
    }
  }
  // stage('Unit Tests') {
  //   steps {
  //     script{
  //       sh 'npm install'
  //       sh 'npm test'
  //     }
  //   }
  // }
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
  stage('build and push test') {
    steps {
      script {
        sh "docker build -t registry.internallab.co.uk:5000:${env.BUILD_NUMBER} ."
        sh "docker image tag registry.internallab.co.uk:5000:${env.BUILD_NUMBER} registry.internallab.co.uk:5000:testing"
        sh "docker login -u jenkins -p Renegade187! registry.internallab.co.uk:5000"
        sh "docker push registry.internallab.co.uk:5000:${env.BUILD_NUMBER}"
        sh "docker push registry.internallab.co.uk:5000:testing"
        sh "docker image rmi registry.internallab.co.uk:5000:testing"
        sh "docker image rmi registry.internallab.co.uk:5000:${env.BUILD_NUMBER}"
        }
      }
    }
  }
  stage('build and push latest') {
    steps {
      script {
        sh "docker build -t registry.internallab.co.uk:5000:latest ."
        sh "docker login -u jenkins -p Renegade187! registry.internallab.co.uk:5000"
        sh "docker push registry.internallab.co.uk:5000:latest"
        sh "docker image rmi registry.internallab.co.uk:5000:latest"
      }
    }
  }
  // stage('Deploy Kubernetes') {
  //   steps {
  //     when {
  //     expression {COMMIT_MSG =='DONE'}
  //     }
  //     script {

  //     }
  //   }
  // }
}
