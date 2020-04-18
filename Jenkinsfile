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
                sh'''
                npm run deploy
                '''
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
}




