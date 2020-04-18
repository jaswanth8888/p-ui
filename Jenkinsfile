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
}




