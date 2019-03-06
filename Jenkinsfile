pipeline {
  agent {
       docker {
           image 'node:latest'
       }
   }
  stages {
    stage('Check Commit') {
      steps {
        // deleteDir()
        // checkout scm
        script{
          COMMIT_MSG = sh(returnStdout: true, script: "git log -1 --pretty=oneline | awk '{print \$2}' | tr -d '\n'")
          ISSUE_ID = sh(returnStdout: true, script: "git log -1 --pretty=oneline | awk '{print \$3}' | tr -d '\n'")
          SVC_NAME = sh(returnStdout: true, script: "echo ${env.JOB_NAME} | awk -F/ '{print \$2}'").replaceAll('\\s', '')
          PROJ_NAME = sh(returnStdout: true, script: "echo ${env.JOB_NAME} | awk -F/ '{print \$1}'").replaceAll('\\s', '')
          PWD = sh(returnStdout: true, script: "pwd")
          echo PWD
        }
      }
    }
    // stage('PR APPROVAL'){
    //  steps{
    //     script {
    //      withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'bitbucket', usernameVariable: 'BB_USERNAME', passwordVariable: 'BB_PASSWORD']]) {
    //          withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'jenkins-incoming', usernameVariable: 'JENKINS_USERNAME', passwordVariable: 'JENKINS_PASSWORD']]) {
    //              PR_STATUS = sh(returnStdout: true, script: "jenkins-pr-check ${PROJ_NAME}/${SVC_NAME} ${env.BRANCH_NAME} ${COMMIT_HASH} ${BB_USERNAME} ${BB_PASSWORD} | awk '{print \$1}'").replaceAll('\\s', '')
    //              PR_ID = sh(returnStdout: true, script: "jenkins-pr-check ${PROJ_NAME}/${SVC_NAME} ${env.BRANCH_NAME} ${COMMIT_HASH} ${BB_USERNAME} ${BB_PASSWORD} | awk '{print \$2}'").replaceAll('\\s', '')
    //          }
    //         }
    //       }
    //     }
    //   }
     stage('Unit Tests') {
       steps {
         script{
           sh 'npm install'
           sh 'npm test'
           }
         }
       }
    // stage('static analysis') {
    //   steps {
    //     script {
    //       def scannerHome = tool name: 'Zayne Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    //        withSonarQubeEnv('Prod') {
    //        sh "${scannerHome}/bin/sonar-scanner"
    //        }
    //      }
    //    }
    //  }
    // stage('SonqarQualityGate') {
    //   steps {
    //     script {
    //       timeout(time: 1, unit: 'HOURS') {
    //       def qg = waitForQualityGate()
    //       if (qg.status != 'OK') {
    //         error "Pipeline aborted due to quality gate failure: ${qg.status}"
    //       }
    //        }
    //      }
    //    }
    // }
  // //Move JIRA task to In Progress
  //   stage ('Jira Progress') {
  //     steps {
  //       script {
  //         def issue = jiraGetIssue idOrKey: "KM-30", site: 'Prod'
  //         currentStatus = issue.data.fields.status.id
  //         def transitions = jiraGetIssueTransitions idOrKey: "KM-30", site: 'Prod'
  //         echo transitions.data.toString()
  //         def arrayLength = transitions.data.transitions.size()
  //         arrayLength.times {
  //             if (transitions.data.transitions[it].to.name == 'In Progress') {
  //                 failedId = transitions.data.transitions[it].id
  //             }
  //         }
  //         def transitionInput = [
  //             transition: [
  //                 id: failedId
  //             ]
  //         ]
  //         jiraTransitionIssue site: 'Prod', idOrKey: "KM-30", input: transitionInput
  //         currentBuild.result = 'SUCCESS'
  //         sh "exit 0"
  //       }
  //     }
  //   }
    // stage('build and push test') {
    //   steps {
    //     script {
    //       sh "docker build -t registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:${env.BUILD_NUMBER} ."
    //       sh "docker image tag registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:${env.BUILD_NUMBER} registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:testing"
    //       sh "docker login -u jenkins -p Renegade187! registry.internallab.co.uk:5000"
    //       sh "docker push registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:${env.BUILD_NUMBER}"
    //       sh "docker push registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:testing"
    //       sh "docker image rmi registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:testing"
    //       sh "docker image rmi registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:${env.BUILD_NUMBER}"
    //       }
    //     }
    //   }
    // stage('PR') {
    //   agent none
    //   when {
    //     expression { COMMIT_MSG == "PR"}
    //   }
    //   steps {
    //     script{
    //       sh "git clone https://ZayneBerndt@bitbucket.org/teamzayne/infrastructure.git ./k8"
    //       sh "sed -ie \"s/:testing/:${BUILD_NUMBER}/g\" ./k8/data.yaml"
    //       kubernetesDeploy kubeconfigId: 'zaynekubeconfig', configs: 'k8/*.yaml'
    //       NODE = sh(returnStdout: true, script: " kubectl get service web-svc -o jsonpath=\"{.spec.ports[0].nodePort}\" -n voteit-${BRANCH_NAME}-${BUILD_NUMBER}")
    //       // echo NODE
    //       sh "curl https://api.bitbucket.org/2.0/repositories/teamzayne/data/pullrequests \
    //       -u zayne@enterpriseautomation.co.uk:Cap3town88 \
    //       --request POST \
    //       --header 'Content-Type: application/json' \
    //       --data '{ \
    //           \"title\": \"My Title\", \
    //           \"description\": \"View this revision at http:192.168.0.157:${NODE}\", \
    //           \"source\": { \
    //               \"branch\": { \
    //                   \"name\": \"${BRANCH_NAME}\" \
    //               } \
    //           } \
    //       }'"
    //     }
    //   }
    // }
    //
    //
    // stage('build and push latest') {
    //   when {
    //     expression { PR_STATUS == "approved"}
    //   }
    //   steps {
    //     script {
    //       sh "docker build -t registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:latest ."
    //       sh "docker login -u jenkins -p Renegade187! registry.internallab.co.uk:5000"
    //       sh "docker push registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:latest"
    //       sh "docker image rmi registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:latest"
    //     }
    //   }
    // }
    //
    // stage ('Jira Done') {
    //   when {
    //     expression { PR_STATUS == "approved"}
    //   }
    //   steps {
    //     script {
    //       def issue = jiraGetIssue idOrKey: "KM-30", site: 'Prod'
    //       currentStatus = issue.data.fields.status.id
    //       def transitions = jiraGetIssueTransitions idOrKey: "KM-30", site: 'Prod'
    //       echo transitions.data.toString()
    //       def arrayLength = transitions.data.transitions.size()
    //       arrayLength.times {
    //           if (transitions.data.transitions[it].to.name == 'Done') {
    //               failedId = transitions.data.transitions[it].id
    //           }
    //       }
    //       def transitionInput = [
    //           transition: [
    //               id: failedId
    //           ]
    //       ]
    //       jiraTransitionIssue site: 'Prod', idOrKey: "KM-30", input: transitionInput
    //       currentBuild.result = 'SUCCESS'
    //       sh "exit 0"
    //     }
    //   }
    // }




  }
  post {
    always {
       deleteDir()
    }
  }
}
