<template>
  <div id="app">
    <Menu mode="horizontal" theme="light" active-name="">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item v-if="!loginsuccess" name="user" id="user" >
                     <Button type="ghost" @click="login">登陆</Button>            
                </Menu-item>
                <div name="userInfo" v-if="loginsuccess" id="user">   
                   <Dropdown placement="bottom-start">      
                   <Badge dot count="1"> 
                    <router-link to="/userInfos">
                          <img src="./assets/logo.png" style="hight:30px;width:30px;display:line-block"/>    
                          <Icon type="arrow-down-b"></Icon>
                    </router-link>    
                         </Badge>
                      <Dropdown-menu slot="list">
                          <Dropdown-item>设置</Dropdown-item>
                          <Dropdown-item>消息</Dropdown-item>
                          <Dropdown-item>退出登陆</Dropdown-item>
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
        //console.log("回传",this.showuserdialog)
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
      }
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
