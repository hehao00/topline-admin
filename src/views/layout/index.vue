<template>
   <el-container>
     <el-aside width="200px">
         <AppAside/>
     </el-aside>
    <el-container>
     <el-header>
         <AppHeader/>
     </el-header>
     <el-main>
       <!--
         禁用路由缓存 只需要给 router-view 添加一个唯一的 key 即可
         key 确保唯一
        -->
         <router-view :key="$route.path"/>
     </el-main>
   </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
    .el-container{
        height:100%;
        .el-aside{
            background-color: rgb(50,55,69);
        }
        .el-main{
            background-color: rgb(242,243,245);
        }
    }
</style>
