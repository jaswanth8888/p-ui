node{
        stage('Cloning Location') {
            sh '''
            docker kill react-ui
            docker rm react-ui
            '''
        }
}
node{
        stage('Cloning Location') {
            // Get some code from a GitHub repository
            git(url:'https://del.tools.publicis.sapient.com/bitbucket/scm/psijsibb/pps-ui.git',
                credentialsId:'1564c89e-0dee-47ec-93f6-e89e75b7cfd8',
                branch:'master')
           
        }
        stage ('Building React container') {
                sh '''
                docker build -t react/ui .
                '''
        }
        stage ('Running React container') {
                sh '''
                docker run  --name=react-ui --net=prices_and_promotions -d -p 3000:3000 react/ui
                '''
        }
        // stage('Sonar testcases') {

        //   def sonarqubeScannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    
        //   withCredentials([string(credentialsId: '6f5b8807-74aa-4944-93b5-da96f2ff59eb', variable: 'sonarLogin')]) {
    
        //     sh "${sonarqubeScannerHome}/bin/sonar-scanner -e -Dsonar.host.url=http://172.18.0.2:9000 -Dsonar.login=${sonarLogin} -Dsonar.projectName=Location-Microservice -Dsonar.projectVersion=${env.BUILD_NUMBER} -Dsonar.projectKey=LM -Dsonar.sources=src/main/ -Dsonar.tests=src/test/ -Dsonar.language=java -Dsonar.java.binaries=."
    
        //   }
    
        // }
}




