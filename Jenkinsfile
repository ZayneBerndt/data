pipeline {
  agent {
        docker {
            image 'registry.internallab.co.uk:5000/slaves/ui-slave:latest'
            args '--dns 192.168.0.61'
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

  //    stage('Unit Tests') {
  //      steps {
  //        script{
  //          sh 'npm install'
  //          sh 'npm test'
  //          }
  //        }
  //      }
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
    stage('build and push test') {
      steps {
        script {
          sh "docker build -t registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:${env.BUILD_NUMBER} ."
          sh "docker image tag registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:${env.BUILD_NUMBER} registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:testing"
          sh "docker login -u jenkins -p Renegade187! registry.internallab.co.uk:5000"
          sh "docker push registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:${env.BUILD_NUMBER}"
          sh "docker push registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:testing"
          sh "docker image rmi registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:testing"
          sh "docker image rmi registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:${env.BUILD_NUMBER}"
          }
        }
      }
  //
  stage('PR') {
    steps {
      // when {
      //     expression { COMMIT_MSG == "PR"}

      //   }

        script{
           // sh "curl https://api.bitbucket.org/2.0/repositories/teamzayne/data/ \
           //  -u BB_USERNAME:BB_PASSWORD"

           sh "git clone git@bitbucket.org:teamzayne/infrastructure.git ./k8"
           sh "sed -ie \"s/:testing/:${BUILD_NUMBER}/g\" ./k8/data.yaml"
        }
        kubernetesDeploy (
          kubeconfigId: 'zaynekubeconfig',
          configs: 'k8/*.yaml'
        )

        // NODE_PORT = sh(returnStdout: true, script: 'kubectl describe service test-web-service | grep NodePort: | grep -o -E "([0-9])\\w+"')
        // echo NODE_PORT
        // URI = http:192.168.0.157: + NODEPORT (edited)
        //get ip and port of stack in env var STACK_URI
        }
        // script{
        //   sh "curl https://api.bitbucket.org/2.0/repositories/teamzayne/data/pullrequests \
        //       -u BB_USERNAME:BB_PASSWORD \
        //       --request POST \
        //       --header 'Content-Type: application/json' \
        //       --data '{ \
        //           \"title\": \"My Title\", \
        //           \"description\": \"View this revision at ${STACK_URI}\", \
        //           \"source\": { \
        //               \"branch\": { \
        //                   \"name\": \"merge-me\" \
        //               } \
        //           } \
        //       }'"
            }
            // stage('build and push latest') {
            //     steps {
            //       script {
            //         sh "docker build -t registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:latest ."
            //         sh "docker login -u jenkins -p Renegade187! registry.internallab.co.uk:5000"
            //         sh "docker push registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:latest"
            //         sh "docker image rmi registry.internallab.co.uk:5000/${PROJ_NAME}/${SVC_NAME}:latest"
            //       }
            //     }
            //   }

            //   //Move JIRA task to DONE
            //     stage ('Jira Done') {
            //       steps {
            //         script {
            //           def issue = jiraGetIssue idOrKey: "KM-30", site: 'Prod'
            //           currentStatus = issue.data.fields.status.id
            //           def transitions = jiraGetIssueTransitions idOrKey: "KM-30", site: 'Prod'
            //           echo transitions.data.toString()
            //           def arrayLength = transitions.data.transitions.size()
            //           arrayLength.times {
            //               if (transitions.data.transitions[it].to.name == 'Done') {
            //                   failedId = transitions.data.transitions[it].id
            //               }
            //           }
            //           def transitionInput = [
            //               transition: [
            //                   id: failedId
            //               ]
            //           ]
            //           jiraTransitionIssue site: 'Prod', idOrKey: "KM-30", input: transitionInput
            //           currentBuild.result = 'SUCCESS'
            //           sh "exit 0"
            //         }
            //       }
            //     }



  }

  post {
    always {
       deleteDir()

    }
  }

}



  // deploy to prod
  //   stage("Deploy") {
  //     when {
  //       expression { COMMIT_MSG == "DONE"}
  //     }
  //     steps {
  //       script{
  //         sh "git clone git@bitbucket.org:teamzayne/infrastructure.git ./k8"
  //       }
  //       kubernetesDeploy (
  //         kubeconfigId: 'zaynekubeconfig',
  //         configs: 'k8/*.yaml'
    //     )
    //   }
    // }




//   }
// }
