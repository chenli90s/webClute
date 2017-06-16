<template>
    <div id="userinfo">
    <Card id="card">
        <Form :model="userInfo" :rules="ruleInline" :label-width="80">
            <Form-item label="邮箱" prop="eMail">
                <Input type="text" v-model="userInfo.eMail" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="手机号"> 
                <Input v-model="userInfo.mobile" placeholder="请输入"></Input> 
            </Form-item>
            <Form-item label="角色">
                <Select v-model="userInfo.partname" placeholder="请选择">
                    <Option value="stu">学生</Option>
                    <Option value="tea">老师</Option>
                    <Option value="pat">家长</Option>
                </Select>
            </Form-item>
            <Form-item label="生日">
                <Row>
                    <Col span="11">
                        <Date-picker type="date" placeholder="选择日期" v-model="userInfo.birthdy"></Date-picker>
                    </Col>
                    
                </Row>
            </Form-item>
            <Form-item label="性别">
                <Radio-group v-model="userInfo.gender">
                    <Radio label="true">男</Radio>
                    <Radio label="false">女</Radio>
                </Radio-group>
            </Form-item>       
            <Form-item>
                <Button type="primary" @click="submit">保存</Button>
            </Form-item>
    </Form>
    </Card>
    </div>
</template>
<script>
     export default {
        data(){
            return{
                userInfo: {
                    eMail: '',
                    gender: '',
                    mobile: '',
                    birthdy: '',
                    partname: '',
                },
                ruleInline: {
                    eMail: [
                        { required: true, min:0,message: '请填写邮箱', trigger: 'blur' },
                        { type: 'email', min:6, message: '邮箱格式不正确', trigger: 'blur' }
                    ]
                 }
            }
        },
        methods: {
            submit(){
                this.$store.state.userInfo.eMail = this.userInfo.eMail
                this.$store.state.userInfo.gender = this.userInfo.gender
                this.$store.state.userInfo.mobile = this.userInfo.mobile
                this.$store.state.userInfo.birthdy = this.userInfo.birthdy
                this.$store.state.userInfo.partname = this.userInfo.partname
                this.$http.post("user/setUserInfo.go",this.$store.state.userInfo)
                .then(res=>{
                    this.$Message.success(res.data.msg)
                })
                .catch(error=>{

                })
            }
        },
        mounted(){
            setTimeout(fun =>{
                if(this.$store.state.userInfo != ''){
                this.userInfo.eMail     =  this.$store.state.userInfo.eMail 
                this.userInfo.gender   =  new String(this.$store.state.userInfo.gender).toString() 
                this.userInfo.mobile   =  this.$store.state.userInfo.mobile 
                this.userInfo.birthdy   =  this.$store.state.userInfo.birthdy 
                this.userInfo.partname =  this.$store.state.userInfo.partname
                //console.log(this.userInfo.gender)
                }
            },100)
        }
    }
</script>

<style>
    #card{
        width: 500px;
        height: 600px;
        margin-top: 10px;
        padding-right: 30px;
    }
</style>