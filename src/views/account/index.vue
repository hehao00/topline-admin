<template>
 <el-card class="box-card">
  <div slot="header">
    <span>账户信息</span>
  </div>
  <el-row>
      <el-col :span="10">
          <el-form v-loading="loading">
              <el-form-item label="媒体名称">
                 <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体简介">
                 <el-input v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="头条号ID">
                 <el-input :value="user.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="绑定手机">
                 <el-input :value="user.mobile" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                 <el-input v-model="user.email"></el-input>
              </el-form-item>
                <el-form-item>
                 <el-button type="primary" @click="handleSave">保存更新</el-button>
              </el-form-item>
          </el-form>
      </el-col>
      <el-col :span="10" offset="2">
          <p>头像设置</p>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false">
            <img v-if="user.photo" :src="user.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
         </el-upload>

      </el-col>
  </el-row>
</el-card>
</template>

<script>
export default {
  name: 'Account',

  data () {
    return {
      user: {},
      loading: false
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    // 加载账户信息
    async loadUser () {
      this.loading = true
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/profile'
        })
        this.user = data
      } catch (err) {
        console.log(err)
        this.$message.error('加载账户信息失败')
      }
      this.loading = false
    },
    // 保存更新
    async handleSave () {
      try {
        const { name, intro, email } = this.user
        await this.$http({
          method: 'PATCH',
          url: '/user/profile',
          data: {
            name,
            intro,
            email
          }
        })
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      } catch (err) {
        console.log(err)
        this.$message.error('保存更新失败')
      }
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="less" scoped>

</style>
