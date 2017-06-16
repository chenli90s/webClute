<template>
    <div id="user">
         <Modal v-model="showdialog" @on-cancel="cancel">
            <p slot="header" style="color:green;text-align:center"><span>登陆/注册</span></p>
            <div style="text-align:center">
                <Tabs type="card" v-model="tablesType" size="small" id="table">
                    <Tab-pane label="登陆" name="login">
                        <Form ref="loginUser" :model="loginUser" :rules="ruleInline" id="loginuser" :label-width="80">
                            <Form-item label="用户名" prop="username">
                                <Input type="text" v-model="loginUser.username" placeholder="用户名/邮箱/手机号">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item label="密码" prop="password">
                                <Input type="password" v-model="loginUser.password" placeholder="密码">
                                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item>
                                <Button type="success" long :loading="login_loading" @click="login('loginUser')">登录</Button>
                            </Form-item>
                        </Form>
                    </Tab-pane>
                    <Tab-pane label="注册" name="regist">
                        <Form ref="registUser" :model="registUser" :rules="ruleInline" :label-width="80">
                            <Form-item label="用户名" prop="username">
                                <Input type="text" v-model="registUser.username" placeholder="用户名">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item label="邮箱" prop="eMail">
                                <Input type="text" v-model="registUser.eMail" placeholder="邮箱">
                                    <Icon type="email" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item label="密码" prop="password">
                                <Input type="password" v-model="registUser.password" placeholder="密码">
                                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                             <Form-item label="确认密码" prop="passwdCheck">
                                <Input type="password" v-model="passwdCheck" placeholder="密码">
                                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item>
                                <Button type="success" long :loading="regist_loading" @click="regist('registUser')">注册</Button>
                            </Form-item>
                        </Form>
                    </Tab-pane>
                </Tabs>
            </div>
           <div slot="footer">
            
           </div>
        </Modal>
    </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
    name: 'user',
    data(){
        const validateUserName = (rule,value,callback)=>{
            //console.log("username",value)
            if(value === ''){
                callback(new Error('用户名不能为空'))
            }else if(this.registUser.username !== ''){
                   //console.log("username",value)
                this.$http.get('/user/checkAccount.go',{
                    params:{usernames : this.registUser.username}
                })
                .then(response=>{
                    if(!response.data.errcode){
                        callback(new Error('用户名已存在！'))
                    }
                })
                .catch(error=>{

                })
            }else {
                callback()
            }
        }
        const validatePassCheck = (rule, value, callback) => {
                value = this.passwdCheck
                if (value === '') {
                    //console.log("pass",value)
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registUser.password) {
                     //console.log("pass-----",value)
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
        return {
            loginUser: {
                username: '',
                password: ''
            },
            registUser: {
                username: '',
                eMail: '',
                password: ''
            },
            passwdCheck: '',
            tablesType: 'login',
            login_loading: false,
            regist_loading: false,
            showdialog: false,
            ruleInline: {
                    username: [
                        { required: true, min:0,message: '请填写用户名', trigger: 'blur' },
                        { validator: validateUserName,trigger: "blur"}
                    ],
                    password: [
                        { required: true, min:0,message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min:1, message: '密码长度不能小于6位', trigger: 'blur' }
                    ],
                    eMail: [
                        { required: true, min:0,message: '请填写邮箱', trigger: 'blur' },
                        { type: 'email', min:6, message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]

                }
        }
    },  
    props: ['dialogshow'],
    methods: {
        login(val){
           this.$refs[val].validate((valid) => {
                    //this.$store.dispatch('loginsuccess')
                    if (valid) {
                        this.login_loading = true
                        this.$http.post("/user/loginUser.go",this.loginUser)
                        .then(response=>{
                            if(!response.data.errcode){
                                this.$Message.success(response.data.msg)
                                this.login_loading = false
                                this.$store.state.userHead = response.data
                                if(!response.data.info){
                                    this.$store.state.userHead.info = ''
                                }
                                this.$emit('dialogclose')
                                this.$store.dispatch('loginsuccess')
                                this.showdialog = false
                            }else{
                                this.login_loading = false
                                this.$Message.error(response.data.msg);
                            }
                        })
                        .catch(error=>{
                            this.login_loading = false
                            this.$Message.error('网络异常');
                        })
                    } else {
                        this.$Message.error('请填写信息完整');
                    }
                })
        },
        regist(val){
             this.$refs[val].validate((valid) => {
                    if (valid) {
                        this.regist_loading = true
                        this.registUser
                        this.$http.post("/user/registUser.go",this.registUser)
                        .then(response=>{
                            if(!response.data.errcode){
                                this.$Message.success(response.data.msg)
                                this.regist_loading = false
                                this.$emit('dialogclose')
                                this.showdialog = false
                            }else{
                                this.regist_loading = false
                                this.$Message.error(response.data.msg);
                            }
                        })
                        .catch(error=>{
                            this.login_loading = false
                            this.$Message.error('网络异常');
                        })
                    } else {
                        this.$Message.error('请填写信息完整');
                    }
                })
        },
        cancel(){
            this.$emit('dialogclose')
            //console.log("showdialog",this.showdialog)
        }
    },
    watch: {
        dialogshow(val){
            if(val){
                //console.log("watch",val)
                this.showdialog = true
            }
        },
        tablesType(val){
            //console.log(val)
            if(val=='login'){
                this.$refs['registUser'].resetFields()
            }else{
                this.$refs['loginUser'].resetFields()
            }
        }
    }
    
}
</script>

<style scoped>
#table{
    margin:0 25px;
}
#loginuser{
    margin-top: 40px;
}
Form{
    margin: 0 auto;
}
</style>