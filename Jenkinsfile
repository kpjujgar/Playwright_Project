pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.64.0-noble'
    }
  }

  environment {
    CI = 'true'
  }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npm test'
      }
    }
  }

  post {
    always {
      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright HTML Report'
      ])
      archiveArtifacts artifacts: 'test-results/**, playwright-report/**', allowEmptyArchive: true
    }
  }
}
