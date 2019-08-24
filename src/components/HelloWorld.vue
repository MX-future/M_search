<template>
  <div class="hello">
    <van-nav-bar class="m_title" title="随搜" style="background:  #99CCFF" />

    <div class='content'>
      <van-field v-model="input_value" class="input_value" />
      <van-button type="default" @click="startSelect" class="source">{{source_type}}</van-button><br/>
      <van-action-sheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
      />
      <van-button type="info" class='search' @click="SearchSongs">搜索</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'HelloWorld',
  data () {
    return {
      input_value:'',
      show: false,
      source_type: '网易云',
      search_list: [],
      actions: [
        {
          name: '网易云'
        },
        {
          name: 'QQ音乐'
        },
        {
          name: '虾米音乐'
        },
      ]
    }
  },
  methods: {
    startSelect(){
      this.show = true;
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.source_type = item.name;
    },
    //搜索
    SearchSongs(){
      if(this.input_value == ''){
        Dialog.alert({
          message: '搜索内容不能为空'
        }).then(() => {
          // on close
        });
        return;
      }
    this.$toast.loading({
      mask: true,
      message: '搜索中...',
      duration: 0
    });
      switch(this.source_type){
        case this.actions[0].name:
          this.source_type = 'netease';
          break;
        case this.actions[1].name:
          this.source_type = 'qq';
          break;
        case this.actions[2].name:
          this.source_type = 'xiami';
          break;
      }
      this.$axios.post('http://47.102.147.8:80/getMusic?S_name='+this.input_value+'&S_from='+this.source_type)
      .then((res) => {
        this.$toast.clear(true);   //关闭加载提示


        this.search_list = res.data;
        //console.log('返回数据',res.data)
        //路由跳转和传值
        this.$router.push({
          path: '/list',
          query: {
            data: this.search_list
          }
        });

      }).catch(err=>{
        console.log('请求失败',err)
      })
      
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m_title{
  padding-top: 40px;
  font-weight: bold;
}
.input_value{
  background: #99CCFF;
  border-radius: 20px;
  margin-bottom: 20px
}
.content{
  margin-top: 40px;
  padding: 50px;
}
button{
  margin-bottom: 10px;
}
.source{
  border: none;
  font-weight: bold;
}
.search{
    width: 140px;
    height: 45px;
    border-radius: 20px;
    outline: none;
    background:  #99CCFF;
    border: none;
    font-weight: bold;
}

</style>
