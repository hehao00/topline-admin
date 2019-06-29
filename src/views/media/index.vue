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
  <el-col :span="4" v-for="(o) in 4" :key="o" >
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
            <el-button plain type="primary" icon="el-icon-star-off" circle></el-button>
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
      active: '全部'
    }
  },

  methods: {}
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
