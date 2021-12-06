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
      when {
        expression { BUILD_TARGET == 'true' }
        expression { DEPLOY_TARGET == 'true' }
      }
      steps {
        sh 'cd /etc/kubeasz; ./ezctl checkout $TARGET_ENV'
      }
    }

    stage('Generate docker image for development') {
      when {
        expression { BUILD_TARGET == 'true' }
      }
      steps {
        sh(returnStdout: true, script: '''
          images=`docker images | grep entropypool | grep japan-webui | grep latest | awk '{ print $3 }'`
          for image in $images; do
            docker rmi $image
          done
        '''.stripIndent())
        sh 'DEVELOPMENT=development make generate-docker-images'
      }
    }

    stage('Tag patch') {
      when {
        expression { TAG_PATCH == 'true' }
      }
      steps {
        sh(returnStdout: true, script: '''
          set +e
          revlist=`git rev-list --tags --max-count=1`
          rc=$?
          set -e
          if [ 0 -eq $rc ]; then
            tag=`git describe --tags $revlist`

            major=`echo $tag | awk -F '.' '{ print $1 }'`
            minor=`echo $tag | awk -F '.' '{ print $2 }'`
            patch=`echo $tag | awk -F '.' '{ print $3 }'`

            case $TAG_FOR in
              testing)
                patch=$(( $patch + $patch % 2 + 1 ))
                ;;
              production)
                patch=$(( $patch + 1 ))
                git checkout $tag
                ;;
            esac

            tag=$major.$minor.$patch
          else
            tag=0.1.1
          fi
          git tag -a $tag -m "Bump version to $tag"
        '''.stripIndent())

        withCredentials([gitUsernamePassword(credentialsId: 'KK-github-key', gitToolName: 'git-tool')]) {
          sh 'git push --tag'
        }
      }
    }

    stage('Tag minor') {
      when {
        expression { TAG_MINOR == 'true' }
      }
      steps {
        sh(returnStdout: true, script: '''
          set +e
          revlist=`git rev-list --tags --max-count=1`
          rc=$?
          set -e
          if [ 0 -eq $rc ]; then
            tag=`git describe --tags $revlist`

            major=`echo $tag | awk -F '.' '{ print $1 }'`
            minor=`echo $tag | awk -F '.' '{ print $2 }'`
            patch=`echo $tag | awk -F '.' '{ print $3 }'`

            minor=$(( $minor + 1 ))
            patch=1

            tag=$major.$minor.$patch
          else
            tag=0.1.1
          fi
          git tag -a $tag -m "Bump version to $tag"
        '''.stripIndent())

        withCredentials([gitUsernamePassword(credentialsId: 'KK-github-key', gitToolName: 'git-tool')]) {
          sh 'git push --tag'
        }
      }
    }

    stage('Tag major') {
      when {
        expression { TAG_MAJOR == 'true' }
      }
      steps {
        sh(returnStdout: true, script: '''
          set +e
          revlist=`git rev-list --tags --max-count=1`
          rc=$?
          set -e
          if [ 0 -eq $rc ]; then
            tag=`git describe --tags $revlist`

            major=`echo $tag | awk -F '.' '{ print $1 }'`
            minor=`echo $tag | awk -F '.' '{ print $2 }'`
            patch=`echo $tag | awk -F '.' '{ print $3 }'`

            major=$(( $major + 1 ))
            minor=0
            patch=1

            tag=$major.$minor.$patch
          else
            tag=0.1.1
          fi
          git tag -a $tag -m "Bump version to $tag"
        '''.stripIndent())

        withCredentials([gitUsernamePassword(credentialsId: 'KK-github-key', gitToolName: 'git-tool')]) {
          sh 'git push --tag'
        }
      }
    }

    stage('Generate docker image for testing or production') {
      when {
        expression { BUILD_TARGET == 'true' }
      }
      steps {
        sh(returnStdout: true, script: '''
          revlist=`git rev-list --tags --max-count=1`
          tag=`git describe --tags $revlist`
          git checkout $tag

          images=`docker images | grep entropypool | grep japan-webui | grep $tag | awk '{ print $3 }'`
          for image in $images; do
            docker rmi $image -f
          done
        '''.stripIndent())
        sh 'DEVELOPMENT=other make generate-docker-images'
      }
    }

    stage('Release docker image for development') {
      when {
        expression { RELEASE_TARGET == 'true' }
      }
      steps {
        sh 'DEVELOPMENT=development make release-docker-images'
      }
    }

    stage('Release docker image for testing or production') {
      when {
        expression { RELEASE_TARGET == 'true' }
      }
      steps {
        sh 'DEVELOPMENT=other make release-docker-images'
      }
    }

    stage('Deploy for development') {
      when {
        expression { DEPLOY_TARGET == 'true' }
        expression { TARGET_ENV == 'development' }
      }
      steps {
        sh 'TAG=latest make deploy-to-k8s-cluster'
      }
    }

    stage('Deploy for testing') {
      when {
        expression { DEPLOY_TARGET == 'true' }
        expression { TARGET_ENV == 'testing' }
      }
      steps {
        sh(returnStdout: true, script: '''
          revlist=`git rev-list --tags --max-count=1`
          tag=`git describe --tags $revlist`

          git checkout $tag
          sed -i "s/japan-webui:latest/japan-webui:$tag/g" cmd/japan-webui/k8s/01-japan-webui.yaml
          TAG=$tag make deploy-to-k8s-cluster
        '''.stripIndent())
      }
    }

    stage('Deploy for production') {
      when {
        expression { DEPLOY_TARGET == 'true' }
        expression { TARGET_ENV ==~ /.*production.*/ }
      }
      steps {
        sh(returnStdout: true, script: '''
          revlist=`git rev-list --tags --max-count=1`
          tag=`git describe --tags $revlist`

          major=`echo $tag | awk -F '.' '{ print $1 }'`
          minor=`echo $tag | awk -F '.' '{ print $2 }'`
          patch=`echo $tag | awk -F '.' '{ print $3 }'`
          patch=$(( $patch - $patch % 2 ))
          tag=$major.$minor.$patch

          git checkout $tag
          sed -i "s/japan-webui:latest/japan-webui:$tag/g" cmd/japan-webui/k8s/01-japan-webui.yaml
          TAG=$tag make deploy-to-k8s-cluster
        '''.stripIndent())
      }
    }

    // stage('Generate docker image') {
    //   when {
    //     expression { BUILD_TARGET == 'true' }
    //   }
    //   steps {
    //     sh(returnStdout: true, script: '''
    //       images=`docker images | grep entropypool | grep japan-webui | awk '{ print $3 }'`
    //       for image in $images; do
    //         docker rmi $image
    //       done
	  // set +e
	  // version=`git describe --tags --abbrev=0`
	  // if [ ! $? -eq 0 ]; then
    // 	    version=latest
	  // fi
	  // set -e 
	  // docker build -t entropypool/japan-webui:$version .
    //     '''.stripIndent())
    //   }
    // }

    // stage('Release docker image') {
    //   when {
    //     expression { RELEASE_TARGET == 'true' }
    //   }
    //   steps {
    //     sh(returnStdout: true, script: '''
	  // set +e
	  // version=`git describe --tags --abbrev=0`
	  // if [ ! $? -eq 0 ]; then
    // 	    version=latest
	  // fi
	  // set -e 
    //       docker push entropypool/japan-webui:$version
    //     '''.stripIndent())
    //   }
    // }

    // stage('Deploy') {
    //   when {
    //     expression { DEPLOY_TARGET == 'true' }
    //   }
    //   steps {
    //     sh 'kubectl apply -k k8s'
    //   }
    // }

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
