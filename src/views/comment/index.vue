<template>
<div>
  <el-table
      class="article-list"
      :data="articles"
      style="width: 100%">
      <el-table-column
        label="标题"
        width="330">
      </el-table-column>
      <el-table-column
        prop="title"
        label="评论状态"
        width="330">
      </el-table-column>
      <el-table-column
        label="总评论数"
        width="330">
      </el-table-column>
       <el-table-column
          prop="pubdate"
          label="粉丝评论数"
          width="330">
        </el-table-column>
      <el-table-column
        label="操作">
         <template>
            <el-button size="mini" type="primary" plain>修改</el-button>
            <el-button size="mini" type="danger" plain >关闭评论</el-button>
          </template>
      </el-table-column>
    </el-table>
   <el-pagination
   class="page"
   background
   layout="prev, pager, next"
   :total="1000">
</el-pagination>
</div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      articles: []
    }
  },

  methods: {
  }
}
</script>

<style lang='less' scoped>
.page{
    text-align: center;
}
</style>
