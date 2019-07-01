<template>
  <div>
   <el-card class="box-card">
  <div slot="header" class="clearfix">
    <img src="./avatar.jpg" alt="">
    <span>河马头条官方账号</span>
  </div>
</el-card>
   <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>最新图文</span>
     <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
  </div>
 <div class="imgs">
   <img src="./avatar.jpg" alt="">
 <span>个税法二审起征点仍为5000元，但有一个新变化</span>
 </div>
 <div class="imgs">
   <img src="./avatar.jpg" alt="">
 <span>个税法二审起征点仍为5000元，但有一个新变化</span>
 </div>
 <div class="imgs">
   <img src="./avatar.jpg" alt="">
 <span>个税法二审起征点仍为5000元，但有一个新变化</span>
 </div>
</el-card>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>动态</span>
     <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
  </div>
  <div class="avataa">
     <img src="./avatar.jpg" alt="">
    <span>林东东 在 Ant Design Pro 发布了 评论</span>
  </div>
   <div class="avataa">
     <img src="./avatar.jpg" alt="">
    <span>周星星 收藏了 项目管理感悟（五）</span>
  </div>
   <div class="avataa">
     <img src="./avatar.jpg" alt="">
    <span>林东东 在 Ant Design Pro 发布了 评论</span>
  </div>
</el-card>
  </div>
</template>

<script>
export default {
  name: 'AppHome',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.box-card {
  padding-bottom:20px;
}
.clearfix {
   img {
     vertical-align: middle;
     margin-right: 10px;
     border-radius: 50%;
   }
}
.imgs {
  margin-bottom:10px;
  img{
    width:100px;
    height: 100px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
.avataa {
  padding-bottom:15px;
  img {
     vertical-align: middle;
     margin-right: 20px;
     border-radius: 50%;
  }
}
</style>
