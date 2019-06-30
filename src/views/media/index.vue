<template>
 <el-card >
  <div slot="header">
    <span>素材管理</span>
  </div>
   <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部" @click.native="loadImages(false)"></el-radio-button>
        <el-radio-button label="收藏" @click.native="loadImages(true)"></el-radio-button>
      </el-radio-group>
      <!--
        name 字段名称
        headers 请求头
        action 请求地址
       -->
        <el-upload
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
        name="image"
        :on-success="() => { this.loadImages(false) }"
        :show-file-list="false">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    </div>
    <el-row>
  <el-col :span="4" v-for="item in images" :key="item.id">
    <el-card :body-style="{ padding: '0px' }" class="box-card">
       <img :src="item.url" class="image" style="max-width: 100%;">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
             <el-button
             plain
             type="primary"
             :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
             circle
             @click="handleCollect(item)"></el-button>
            <el-button
            plain
            type="primary"
            icon="el-icon-delete"
            circle
            @click="handleDelete(item)"></el-button>
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
      pageSize: 10, // 每页大小
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

    },
    // 删除图片
    async handleDelete (item) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$http({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        })
        this.$message({
          type: 'success',
          message: '删除图片成功!'
        })
        // 删除成功重新加载数据列表
        this.loadImages()
      } catch (err) {
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        this.$message.erro('删除图片失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
 .el-col-4 {
   margin-left: 20px;
   width:200px;
   height:200px;
 }
</style>
