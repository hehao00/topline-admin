<template>
 <el-card class="box-card">
  <div slot="header">
    <span>评论管理</span>
  </div>
   <el-table :data="articles">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="评论粉丝数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.disabled"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
    class="page"
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="totalCount"
    @current-change="handleCurrentChange">
   </el-pagination>
</el-card>
</template>
<script>
export default {
  name: '',

  data () {
    return {
      articles: [],
      pageSize: 10, // 每页大小
      totalCount: 0, // 总数据量
      page: 1 // 当前页面
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment'
          }
        })
        this.articles = data.results
      } catch (err) {
        console.log(err)
        this.$message.error('获取失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.page{
    text-align: center;
}
</style>
