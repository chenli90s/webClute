<template>
    <div id="pageinfo">


        <Card id="card">
          <div id="head">
            <div id="headimg">
                <div id="headshow" >
                    <img :src="item.url" > 
                </div>
            </div>
            <Upload action="/user/updataHeadImg.go" 
            name="uploadFile"
            :show-upload-list="false"
            :format="format"
            :on-success="success"       
            >
                <Button type="ghost" icon="ios-cloud-upload-outline">上传头像</Button>
            </Upload>
          </div>
            <Form :model="userInfo" :label-width="80">
                    <Form-item label="昵称">
                        <Input v-model="userInfo.niclname" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="个性签名">
                        <Input v-model="userInfo.declaration" placeholder="请输入"></Input> 
                    </Form-item>     
                    <Form-item>
                        <Button type="primary" @click="submit">保存</Button>
                    </Form-item> 
            </Form> 
        </Card>
    </div>
</template>

<script scopedSlots>
    export default {
       data(){
           return {
               headimgshow: true,
               userInfo:{
                   niclname: '',
                   declaration: ''
               },
               item: {
                   name: 'default',
                   url: require('../../assets/logo.png')
               },
               format: ['jpg','png','jpeg'],
               imgName: '',
               visible: false
           }
       },
       methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
           success(res,file){
                //console.log(res)
                this.item.url = res.info
                this.$store.state.userHead.info = res.info
                this.$store.state.userInfo.head = res.msg
            },
            submit(){
                this.$store.state.userInfo.niclname = this.userInfo.niclname
                this.$store.state.userInfo.declaration = this.userInfo.declaration
                console.log(this.$store.state.userInfo.announces)
                this.$http.post("/user/setUserInfo.go",this.$store.state.userInfo)
                .then(res=>{
                    console.log(res.data)
                    this.$Message.success(res.data.msg)
                })
                .catch(error=>{
                    
                })
            }
       },
       mounted(){
            if(this.$store.state.userInfo.head != ''){
                this.item.url = this.$store.state.userHead.info
            }
            setTimeout(fun=>{
                if(this.$store.state.userInfo != ''){
                    this.userInfo.niclname = this.$store.state.userInfo.niclname
                    this.userInfo.declaration= this.$store.state.userInfo.declaration
                }
            },500)
           
       }
    }
</script>
<style scoped>
    #card{
        width: 500px;
        height: 600px;
        margin-top: 10px;
        padding-right: 30px;
    }
    #updateimg{
        width: 200px;
        margin: 0 auto;
    }
    #head{
        position: relative;
        width: 100px;
        padding: 0px;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    #headimg{
        width: 50px;
        height:50px;
        position: relative;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    #headimg img{
        width: 50px;
        height:50px;
    }
</style>
