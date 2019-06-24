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
                <!-- 使用 .native 事件修饰符将原始的html页面注册到组件的根元素  -->
                <el-dropdown-item @click.native="handleLogout" icon="iconfont icon-tuichu">退出</el-dropdown-item>
            </el-dropdown-menu>
           </el-dropdown>
       </el-col>
    </el-row>
</template>

<script>
import { removeUser, getUser } from '@/utils/auth'
export default {
  name: 'AppHeader',

  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    this.userInfo = getUser()
  },
  methods: {
    handleLogout () {
      this.$confirm('此操作将退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 清空本地存储中的 user_info
        // window.localStorage.removeItem('user_info')
        removeUser()
        // 跳转到登陆页面
        this.$router.push({ name: 'login' })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
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
