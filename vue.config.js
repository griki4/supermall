const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  configureWebpack:{
    resolve:{
      alias:{
        //配置文件夹别名，新版脚手架中
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
})
