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
node{
        checkout scm
        stage('npm')
        {
                sh'''
                npm install
                '''
        }
        stage('npm-build')
        {
                sh'''
                npm run-script build
                '''
        }
        stage('deploy')
        {
                s3Upload consoleLogLevel: 'INFO', dontSetBuildResultOnFailure: false, dontWaitForConcurrentBuildCompletion: false, entries: [[bucket: 'pps-blr-react-app', excludedFile: '/build/', flatten: false, gzipFiles: false, keepForever: false, managedArtifacts: true, noUploadOnFailure: true, selectedRegion: 'us-east-1', showDirectlyInBrowser: false, sourceFile: '**/build/*', storageClass: 'STANDARD', uploadFromSlave: false, useServerSideEncryption: false]], pluginFailureResultConstraint: 'FAILURE', profileName: 'pps-blr-react-app', userMetadata: []
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




