<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>卡片名称</span>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
    </div>
    </el-card>
     <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>卡片名称</span>
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
    <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
   </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AppArticle',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style scoped>
 .box-card{
    margin-bottom: 15px;
 }
</style>
