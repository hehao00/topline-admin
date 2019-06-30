<template>
 <el-card class="box-card">
  <div slot="header">
    <span>素材管理</span>
  </div>
   <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-button type="primary">上传图片</el-button>
    </div>
    <el-row>
  <el-col :span="4" v-for="item in images" :key="item.id" >
    <el-card :body-style="{ padding: '0px' }">
       <img :src="item.url" class="image" style="max-width: 100%;">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
             <el-button
             plain
             type="primary"
             :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
             circle
             @click="handleCollect(item)"></el-button>
            <el-button plain type="primary" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
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
  name: 'Media',

  data () {
    return {
      active: '全部',
      images: [],
      page: 1, // 当前页面
      per_page: 10, // 每页大小
      totalCount: 0 // 总数据
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    // 加载图片列表
    async loadImages (collect = false) {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/images',
          params: {
            collect, // 是否查询收藏图片，默认查所有
            page: this.page, // 页面
            per_page: this.pageSize // 每页大小
          }
        })
        this.images = data.results
        this.totalCount = data.total_count
      } catch (err) {
        console.log(err)
        this.$message.error('加载图片列表失败')
      }
    },
    // 收藏图片
    async handleCollect (item) {
      const collect = !item.is_collected
      try {
        const data = await this.$http({
          method: 'PUT',
          url: `/user/images/${item.id}`,
          data: {
            collect
          }
        })
        item.is_collected = data.collect
        this.$message({
          type: 'success',
          message: `${collect ? '' : '取消'}收藏成功`
        })
      } catch (err) {
        this.$message.error('收藏图片失败')
      }
    },
    // 分页数据
    async handleCurrentChange () {

    }
  }
}
</script>

<style scoped>
.action {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.page{
  text-align: center;
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>
