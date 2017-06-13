<template>
    <div id="userinfo">
    <Card id="card">
        <Form :model="userInfo" :label-width="80">
        <Form-item label="邮箱">
            <Input v-model="userInfo.eMail" placeholder="请输入"></Input>
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
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </Radio-group>
        </Form-item>       
        <Form-item label="描述">
            <Input v-model="userInfo.declaration" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>
            <Button type="primary">保存</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
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
                    username:'',
                    eMail: '',
                    isactivite: '',
                    niclname: '',
                    head: '',
                    gender: '',
                    mobile: '',
                    birthdy: '',
                    declaration: '',
                    partname: ''
                }
            }
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