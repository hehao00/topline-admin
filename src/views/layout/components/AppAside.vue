<template>
     <el-col>
         <img src="./logo_admin.png" alt="">
     <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="rgb(53,59,78)"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      >
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish"><i class="iconfont icon-xinwen"></i>发布文章</el-menu-item>
          <el-menu-item index="/article"><i class="iconfont icon-neirongliebiao"></i>内容列表</el-menu-item>
          <el-menu-item index="/comment"><i class="iconfont icon-wenbenshuru"></i>评论列表</el-menu-item>
          <el-menu-item index="/media"><i class="iconfont icon-sucai"></i>素材管理</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/fans"><i class="iconfont icon-tuwen"></i>图文数据</el-menu-item>
          <el-menu-item index="/overview"><i class="iconfont icon-7-copy"></i>粉丝概况</el-menu-item>
          <el-menu-item index="2-3"><i class="iconfont icon-fensi"></i>粉丝画像</el-menu-item>
          <el-menu-item index="2-4"><i class="iconfont icon-wenbenjuzhong"></i>粉丝列表</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/account">
        <i class="el-icon-document"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
 </el-col>
</template>

<script>
export default {
  name: 'AppAside',

  data () {
    return {
    }
  },

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang='less'>
    img{
        height:30px;
        widows: 120px;
        margin-top:10px;
        padding-left:20px;
        padding-bottom:10px;
    }
</style>
