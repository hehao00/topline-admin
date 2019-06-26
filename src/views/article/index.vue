<template>
  <div>
      <!-- 数据筛选 -->
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>数据筛选</span>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
    </div>
    </el-card>
    <!-- 文章列表 -->
     <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>一共有xxx条数据</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
   </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import { getUser } from '@/utils/auth'
export default {
  name: 'AppArticle',

  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
    //   const token = getUser().token
      // 除了登陆接口 其他接口都必须在请求头通过 Authorization 字段提供用户 token
      // 登陆成功 服务端会生成一个 token 令牌 放到用户信息中
      const data = await this.$http({
        method: 'GET',
        url: '/articles'
      })
      console.log(data)
    }
  }
}
</script>

<style scoped>
 .box-card{
    margin-bottom: 15px;
 }
</style>
