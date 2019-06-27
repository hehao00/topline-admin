<template>
  <div>
      <!-- 数据筛选 -->
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>数据筛选</span>
    </div>
        <el-form ref="form" :model="filterParams" label-width="80px">
           <el-form-item label="文章状态">
              <el-radio-group v-model="filterParams.status">
                <el-radio label="全部"></el-radio>
                <el-radio
                v-for="(item,index) in statTypes"
                :key="item.label"
                :label="index">{{ item.label }}</el-radio>
              </el-radio-group>
           </el-form-item>
           <el-form-item label="频道列表">
            <el-select v-model="filterParams.channel_id" clearable placeholder="请选择活动区域">
              <el-option
              v-for="item in channels"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="时间选择">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="handleDateChange"
              v-model="range_date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
  <el-form-item>
    <el-button type="primary">筛选</el-button>
  </el-form-item>
</el-form>
    </el-card>
    <!-- 文章列表 -->
     <el-card class="box-card1">
    <div slot="header" class="clearfix">
        <span>一共有<strong>{{ totalCount }}</strong>条数据</span>
    </div>
    <!--
      不需要手动 v-for 遍历
      将数组数据交给 table 的 data 属性
      配置 el-table-column 表格列组件即可
        lable 列头标题
        prop 遍历项中的数据字段
        width 列宽
        表格默认把数据当文本去输出
        如果需要其他的数据格式  可以自定义表格列
     -->
    <el-table
      class="article-list"
      :data="articles"
      style="width: 100%">
      <el-table-column
        label="封面"
        width="300">
        <!--
          template 中的内容就是自定义表格列内容
          如果需要在 template 中访问遍历项数据，则需要给 template 配置 slot-scope="scope"
          slot-scope 属性名是固定的
          scope 值是自己起的名字
          通过 scope.row 访问当钱遍历项对象
         -->
        <template slot-scope="scope">
          <img
          width="20"
          v-for="item in scope.row.cover.images"
          :key="item"
          :src="item">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="300">
      </el-table-column>
      <el-table-column
        label="状态"
        width="300">
         <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">{{ statTypes[scope.row.status].label }}</el-tag>
          </template>
      </el-table-column>
       <el-table-column
          prop="pubdate"
          label="发布时间"
          width="300">
        </el-table-column>
      <el-table-column
        label="操作">
         <template>
            <el-button size="mini" type="primary" plain>修改</el-button>
            <el-button size="mini" type="danger" plain>删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!--
      page-size 配置每页大小， 默认是 10
      total 用来配置总记录数
      分页组件会根据每页大小和总记录进行分页
     -->
    <el-pagination
    class="page"
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="totalCount"
    @current-change="handleCurrentChange">
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
      articles: [],
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      pageSize: 10, // 每页大小
      totalCount: 0, // 总数据量
      page: 1, // 当前页面
      filterParams: {
        status: '', // 文章状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      },
      range_date: '', // 时间范围绑定值  为了绑定 date 组件触发 change 事件
      channels: [] // 所有频道
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  methods: {
    // 时间
    handleDateChange (value) {
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    },
    // 获取频道列表数据
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        this.channels = data.channels
      } catch (err) {
        console.log(err)
        this.$message.error('获取频道数据失败')
      }
    },
    // 数据列表
    async loadArticles () {
      // 请求开始 加载loading
      this.articleLoading = true
      // const token = getUser().token
      // 除了登陆接口 其他接口都必须在请求头通过 Authorization 字段提供用户 token
      // 登陆成功 服务端会生成一个 token 令牌 放到用户信息中
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page, // 页面
          per_page: this.pageSize // 每页大小
        }
      })
      // console.log(data)
      this.articles = data.results
      this.totalCount = data.total_count
      // 请求结束 停止
      this.articleLoading = false
    },
    handleCurrentChange (page) {
      // 将数据中的页面码修改为当前最新改变的数据页面
      this.page = page
      // 页面改变 重新加载当前文章列表
      this.loadArticles()
    }
  }
}
</script>

<style scoped lang="less">
 .box-card{
    margin-bottom: 15px;
 }
 .page{
   text-align: center;
 }
 .article-list{
   margin-bottom: 30px;
}
</style>
