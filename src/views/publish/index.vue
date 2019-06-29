<template>
   <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
    </div>
    <el-row>
      <el-col :span="20">
        <!-- 表单 -->
        <el-form ref="form" :model="articleForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title" placeholder="文章名称"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <!-- <el-input type="textarea" v-model="articleForm.content"></el-input> -->
             <quill-editor v-model="articleForm.content"
                ref="myQuillEditor"
                :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="封面">
          </el-form-item>
          <el-form-item label="频道">
            <!-- <el-select v-model="articleForm.channel_id" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
            <article-channel v-model="articleForm.channels_id"></article-channel>
          </el-form-item>
        </el-form>
        <!-- /表单 -->
      </el-col>
    </el-row>
     <div class="button2">
        <el-button type="success" @click="handlePublish(false)">发布</el-button>
        <el-button type="primary" @click="handlePublish(true)">存入草稿</el-button>
      </div>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
// 富文本编辑器样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AppPublish',
  components: {
    ArticleChannel,
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        channel_id: '', // 频道
        cover: { // 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        }
      },
      editorOption: {} // 富文本编辑器配置选项
    }
  },
  created () {
    // 判断页面是否是编辑页面
    if (this.$route.name === 'publish-edit') {
      this.loadArticle()
    }
  },
  methods: {
    // 修改文章
    async loadArticle () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: `/articles/${this.$route.params.id}`
        })
        this.articleForm = data
      } catch (err) {
        console.log(err)
        this.$message.error('获取文章失败')
      }
    },
    async handlePublish (draft) {
      try {
        if (this.$router.name === 'publish') {
          await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        } else {
          await this.$http({
            method: 'PUT',
            url: `/articles/${this.$route.params.id}`,
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        }
      } catch (err) {
        this.$message.error('操作失败', err)
      }
    }
  }
}
</script>
<style>
.ql-container{
    height:350px;
}
</style>

<style lang="less" scoped>
 .button2{
   margin-top:10px;
   margin-left:50px;
 }
</style>
