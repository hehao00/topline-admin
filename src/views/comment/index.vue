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
  name: 'ArticleComment',

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
    // 查询
    handleFilter () {
      // 点击查询按钮 根据表单中的数据查询文章列表
      this.page = 1 // 查询从第一页开始加载数据
      this.loadArticles()
    },
    // 获取评论列表
    async loadArticles () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment',
            page: this.page, // 页面
            per_page: this.pageSize // 每页大小
          }
        })
        // 手动造一个数据 disabled 用来控制每一行的switch 开关的启用状态
        data.results.forEach(item => {
          item.disabled = false
        })
        this.articles = data.results
        this.totalCount = data.total_count
      } catch (err) {
        console.log(err)
        this.$message.error('获取失败')
      }
    },
    // 分页
    handleCurrentChange (page) {
      // 将数据中的页面码修改为当前最新改变的数据页面
      this.page = page
      // 页面改变 重新加载当前文章列表
      this.loadArticles()
    },
    // 控制评论状态
    async handleChangeStatus (item) {
      try {
        // 禁用当前行的 switch 开关
        item.disabled = true
        // 请求修改
        await this.$http({
          method: 'PUT',
          url: '/comments/status',
          params: {
            article_id: item.id.toString()
          },
          data: {
            allow_comment: item.comment_status
          }

        })
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '禁用'}评论状态成功`
        })
      } catch (err) {
        console.log(err)
        this.$message.error('修改评论状态失败')
        // 评论状态修改失败 让客户端评论状态回到原来的状态
        item.comment_status = !item.comment_status
      }
      // 启用当前行的 switch 开关
      item.disabled = false
    }
  }
}
</script>

<style lang='less' scoped>
.page{
    text-align: center;
}
</style>
