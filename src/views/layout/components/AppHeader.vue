<template>
    <el-row>
      <el-col :span="17"><div class="js">江苏传智播客教育科技股份有限公司</div></el-col>
       <el-col :span="3" :offset="4">
           <img :src="userInfo.photo">
           <el-dropdown trigger="click">
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
        width: 30px;
        height:30px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .el-col{
        line-height: 60px;
        padding-left:5px;
    }
   </style>
