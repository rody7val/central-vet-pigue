module.exports = {
    pluginOptions: {
        proxy: {
            enabled: true,
            context: '/',
            options: {
		        target: 'https://web-central-vet.herokuapp.com',
		        changeOrigin: true
            }
        }
    }
}