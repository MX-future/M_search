<template>
  <div class="res_list">
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="onClickLeft"
        class="m_title"
        style="background:  #99CCFF"
        />
        <div class="all_list" v-if="this.list!=''">
            <van-cell v-for="item in list" :key="item.id" 
                     :title="item.M_name" :label="item.A_name" 
                     class="m_list"
                     :data-clipboard-text="item.url"
                     @click="copy()" />
        </div>
        <van-cell title="数据为空" v-else />
  </div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
    data(){
      return {
          list: [], 
      }
    },
    methods: {
      onClickLeft() {
        this.$router.push({
          path: '/',
        });
      },
      //下载功能,打包为手机app后失效，只支持浏览器
    //   download (url,name) {   //参数分别为歌曲地址和歌曲名字
    //     if (!url) {
    //         return
    //     }
    //     console.log('执行')
    //     //需要加上{responseType: 'blob'}，否则下载的文件是无法播放的
    //     this.$axios.get(url,{responseType: 'blob'}).then(res=>{
    //       console.log(res.data)
    //       let url = window.URL.createObjectURL(new Blob([res.data]))
    //       let link = document.createElement('a')
    //       link.style.display = 'none'
    //       link.href = url
    //       link.setAttribute('download', name+'.mp3')
          
    //       document.body.appendChild(link)
    //       link.click()
    //     }) 
    // },
    copy(){
      var clipboard = new Clipboard('.m_list')
        clipboard.on('success', e => {
          this.$toast('复制链接成功');
          // 释放内存
          clipboard.destroy();
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$toast('复制链接失败');
          // 释放内存
          clipboard.destroy();
        })
    }
    },
    mounted(){
      //路由接收值
      this.list = this.$route.query.data
      console.log('路由接收到值',this.list)
    }
}
</script>



<style scoped>
.m_title{
  padding-top: 40px;
  font-weight: bold;
  width: 100%;
}
.all_list{
  padding: 0 8px;
}
.all_list .m_list{
  margin: 10px 0px;
  border-radius: 8px;
  background: lightblue;
}
</style>