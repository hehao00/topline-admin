<template>
    <el-row>
      <el-col :span="22"><div class="js">江苏传智播客教育科技股份有限公司</div></el-col>
       <el-col :span="2">
           <el-dropdown trigger="click">
               <img :src="userInfo.photo">
            <span class="el-dropdown-link">
                {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="iconfont icon-icon_boss">个人信息</el-dropdown-item>
                <el-dropdown-item icon="iconfont icon-tuichu">退出</el-dropdown-item>
            </el-dropdown-menu>
           </el-dropdown>
       </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'AppHeader',

  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  }
}
</script>

<style scoped lang='less'>
    img{
        width: 35px;
        height:35px;
        border-radius: 50%;
        vertical-align: middle;
        // padding-left:5px;
    }
    .el-col{
        line-height: 60px;
        padding-left:5px;
    }
</style>
