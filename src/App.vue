<template>
  <div id="app">
    <Menu mode="horizontal" theme="light" active-name="">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item v-if="!loginsuccess" name="user" id="user" >
                     <Button type="ghost" @click="login">登陆</Button>            
                </Menu-item>
                <div name="userInfo" v-if="loginsuccess" id="user">   
                   <Dropdown placement="bottom-start"  @on-click="clickItem">  
                        <Badge dot count="1"> 
                          <router-link to="/userInfos/pageInfo">
                                <img :src="headimgdata" style="height:30px;width:30px;display:line-block"/>    
                                <Icon type="arrow-down-b"></Icon>
                          </router-link>    
                        </Badge>     
                      <Dropdown-menu slot="list" >
                          <Dropdown-item name="setting">设置</Dropdown-item>
                          <Dropdown-item name="message">消息</Dropdown-item>
                          <Dropdown-item name="loginout" @on-click="loginout">退出登陆</Dropdown-item>
                      </Dropdown-menu>
                  </Dropdown>
                </div>
            </div>
        </Menu>
        <user :dialogshow="showuserdialog" @dialogclose="dialogclose"></user>
        
            <div id="wrapper">
              <router-view></router-view>
            </div>
           
        
        
  </div>
  
</template>

<script>


export default {
    name: 'app',
    data(){
      return {
        headimgdata: require('./assets/logo.png'),
        showuserdialog: false
      }
    },
    methods: {
      login(){
        this.showuserdialog = !this.showuserdialog
        //console.log(this.showuserdialog)
      },
      dialogclose(){
        this.showuserdialog = false
        if(this.$store.state.userHead.info != ''){
            //console.log(this.$store.state.userHead.info)
            this.headimgdata = this.$store.state.userHead.info
        }
        //console.log("回传",this.headimgdata)
      },
      clickItem: function(name){
        if(name == "loginout"){
          this.loginout()
        }
      },
      loginout(){
        this.$http.post("/user/loginUserOut.go")
        .then(res=>{
          this.$store.state.loginsuccess = false
          this.$store.state.userHead = ''
          this.$store.state.userInfo = ''
          this.$router.replace({path: '/'})
        })
        .catch(erroe=>{
          this.$store.state.loginsuccess = false
          this.$store.state.userHead = ''
          this.$store.state.userInfo = ''
          this.$router.replace({path: '/'})
        })
      }
    },
    components: {
      user(resolve) {
				require(['@/components/User.vue'], resolve);
			}
    },
    computed: {
      loginsuccess(){
        return this.$store.state.loginsuccess
      },
      headimgflash(){
        return this.$store.state.userHead.info
      }
    },
    watch: {
      headimgflash(){
        this.headimgdata = this.$store.state.userHead.info
      }
    },
    mounted(){
      this.$http.post('/user/isLive.go')
      .then(res=>{
        if(!res.data.errcode){
          this.$store.state.userHead = res.data
          this.$store.state.loginsuccess = true
          this.headimgdata = res.data.info
        }
      })
      .catch(erroe=>{
        console.log("登陆失败")
      })
    }
}
</script>

<style scoped>
#app {
  background-color: #DDDEE1; 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  padding: 0px;
  height: 800px;  
}
#wrapper{
  width: 80%;
  margin: 0 auto;
}
#user{
  float:right;
  margin-right: 100px;
}
</style>
