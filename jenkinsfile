pipeline {
    agent any
    stages {
        stage('scm') {
              steps {
                  sh 'echo hi'
              }
          }
        stage('Build') {
               when {
                   expression { COMMIT =='DONE' }
                 }
                steps {
                   npm install
              }
           }
         stage('Test') {
               when {
                     expression { COMMIT =='DONE' }
                   }
                steps {
                    sh './jenkins/scripts/test.sh'
                }
            }
}
