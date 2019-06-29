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
                 <el-button type="primary">保存更新</el-button>
              </el-form-item>
          </el-form>
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
