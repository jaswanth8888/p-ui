node{
        try{
                
            sh '''
            docker kill react-ui
            
            '''
            }
            catch(e){
                sh "echo no containers"
            }
            try{
                
            sh '''
            docker rm  react-ui
            
            '''
            }
            catch(e){
                sh "echo no containers"
            }
            
            
        }
}
node{
        checkout scm

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




