pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git(url: scm.userRemoteConfigs[0].url, branch: '$BRANCH_NAME', changelog: true, credentialsId: 'KK-github-key', poll: true)
      }
    }

    stage('Compile') {
      when {
        expression { BUILD_TARGET == 'true' }
      }
      steps {
        sh (returnStdout: false, script: '''
	  set +e
	  PATH=/usr/local/bin:$PATH:./node_modules/@quasar/app/bin command quasar
	  rc=$?
	  set -e
	  if [ ! $rc -eq 0 ]; then
	    n latest
	    PATH=/usr/local/bin:$PATH npm i -g mirror-config-china --registry=https://registry.npm.taobao.org
	    PATH=/usr/local/bin:$PATH npm install --global --registry https://registry.npm.taobao.org yarn
	    PATH=/usr/local/bin:$PATH yarn config set registry 'https://registry.npm.taobao.org'
            PATH=/usr/local/bin:$PATH yarn add global quasar-cli@latest
	  fi
	  PATH=/usr/local/bin:$PATH:./node_modules/@quasar/app/bin yarn install --registry https://registry.npm.taobao.org/
	  PATH=/usr/local/bin:$PATH:./node_modules/@quasar/app/bin quasar build
        '''.stripIndent())
      }
    }

    stage('Switch to current cluster') {
        steps {
            sh 'cd /etc/kubeasz; ./ezctl checkout $TARGET_ENV'
        }
    }

    stage('Generate docker image') {
      when {
        expression { BUILD_TARGET == 'true' }
      }
      steps {
        sh(returnStdout: true, script: '''
          images=`docker images | grep entropypool | grep japan-webui | awk '{ print $3 }'`
          for image in $images; do
            docker rmi $image
          done
	  set +e
	  version=`git describe --tags --abbrev=0`
	  if [ ! $? -eq 0 ]; then
    	    version=latest
	  fi
	  set -e 
	  docker build -t entropypool/japan-webui:$version .
        '''.stripIndent())
      }
    }

    stage('Release docker image') {
      when {
        expression { RELEASE_TARGET == 'true' }
      }
      steps {
        sh(returnStdout: true, script: '''
	  set +e
	  version=`git describe --tags --abbrev=0`
	  if [ ! $? -eq 0 ]; then
    	    version=latest
	  fi
	  set -e 
          docker push entropypool/japan-webui:$version
        '''.stripIndent())
      }
    }

    stage('Deploy') {
      when {
        expression { DEPLOY_TARGET == 'true' }
      }
      steps {
        sh 'kubectl apply -k k8s'
      }
    }

    stage('Post') {
      steps {
        // Assemble vet and lint info.
        // warnings parserConfigurations: [
        //   [pattern: 'govet.txt', parserName: 'Go Vet'],
        //   [pattern: 'golint.txt', parserName: 'Go Lint']
        // ]

        // sh 'go2xunit -fail -input gotest.txt -output gotest.xml'
        // junit "gotest.xml"
        sh 'echo Posting'
      }
    }
  }
  post('Report') {
    fixed {
      script {
        sh(script: 'bash $JENKINS_HOME/wechat-templates/send_wxmsg.sh fixed')
     }
      script {
        // env.ForEmailPlugin = env.WORKSPACE
        emailext attachmentsPattern: 'TestResults\\*.trx',
        body: '${FILE,path="$JENKINS_HOME/email-templates/success_email_tmp.html"}',
        mimeType: 'text/html',
        subject: currentBuild.currentResult + " : " + env.JOB_NAME,
        to: '$DEFAULT_RECIPIENTS'
      }
     }
    success {
      script {
        sh(script: 'bash $JENKINS_HOME/wechat-templates/send_wxmsg.sh successful')
     }
      script {
        // env.ForEmailPlugin = env.WORKSPACE
        emailext attachmentsPattern: 'TestResults\\*.trx',
        body: '${FILE,path="$JENKINS_HOME/email-templates/success_email_tmp.html"}',
        mimeType: 'text/html',
        subject: currentBuild.currentResult + " : " + env.JOB_NAME,
        to: '$DEFAULT_RECIPIENTS'
      }
     }
    failure {
      script {
        sh(script: 'bash $JENKINS_HOME/wechat-templates/send_wxmsg.sh failure')
     }
      script {
        // env.ForEmailPlugin = env.WORKSPACE
        emailext attachmentsPattern: 'TestResults\\*.trx',
        body: '${FILE,path="$JENKINS_HOME/email-templates/fail_email_tmp.html"}',
        mimeType: 'text/html',
        subject: currentBuild.currentResult + " : " + env.JOB_NAME,
        to: '$DEFAULT_RECIPIENTS'
      }
     }
    aborted {
      script {
        sh(script: 'bash $JENKINS_HOME/wechat-templates/send_wxmsg.sh aborted')
     }
      script {
        // env.ForEmailPlugin = env.WORKSPACE
        emailext attachmentsPattern: 'TestResults\\*.trx',
        body: '${FILE,path="$JENKINS_HOME/email-templates/fail_email_tmp.html"}',
        mimeType: 'text/html',
        subject: currentBuild.currentResult + " : " + env.JOB_NAME,
        to: '$DEFAULT_RECIPIENTS'
      }
     }
  }
}
