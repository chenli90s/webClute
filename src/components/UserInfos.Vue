<template>
    <div id="infos">   
        <Menu theme="light" :active-name="itemname" @on-select="select" id="userInfos">       
            <Menu-item name="/userinfos/pageinfo">
                <Icon type="document-text"></Icon>
                页面设置
            </Menu-item>
            <Menu-item name="/userinfos/userinfo">
                <Icon type="chatbubbles"></Icon>
                信息设置
            </Menu-item>
        </Menu>
    <router-view id="info"></router-view>
    </div>
</template>
<script>
    export default {
        name: 'userinfos',
        data(){
            return {
                itemname: '/userinfos/pageinfo'
            }
        },
        methods: {
            select(val){
                //console.log(val)
               
                this.$router.push(val);
                
            }
        },
        mounted(){
            this.$http.post("/user/getUserInfo.go")
            .then(response=>{
                this.$store.state.userInfo = response.data;
            })
            .catch(err=>{
                this.$Message.error('个人信息获取失败')
            })
            //this.$router.push(itemname);
        }
    }
    
</script>
<style scoped>
    #infos{
        margin: 0 auto;
        overflow: hidden;
    }
    #userInfos{
        float: left;
        margin-top:12px;
    }   
    #info{
        float:left;
    } 
</style>



