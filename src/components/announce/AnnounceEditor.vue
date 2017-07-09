<template>
    <div id="announceEditor">
        <div id="card">
            <Button type="success" long style="height:40px" @click="say">说两句</Button>
            <transition name="fade">
            <Card  v-show="sayshow">
                <div id="editor"></div>
                <div id="btn">
                    <Button @click="send" type="primary" icon="checkmark-circled" style="margin-right:20px">发出</Button>
                    <Button @click="clear" type="primary" icon="close-circled">清空</Button>
                </div>  
            </Card>
            </transition>
        </div>
    </div>
</template>
<script>
import wangeditor from 'wangeditor'
import lrz from 'lrz'
export default {
    name: 'announceEditor',
    data(){
        return {
            editor: 's',
            sayshow: false,
            html: '',
            txt: '',
            context:{
                aid: '',
                status: 'yum',
                content: '',
                date: '',
                hot: '0',
                attribute: '',
                userid: ''
            }
        }
    },
    methods:{
        createEditor(){
            this.editor = new wangeditor("#editor")
            this.editor.customConfig.uploadImgServer = 'http://localhost:8081/announce/uploadImg.go'
            this.editor.customConfig.uploadFileName = 'uploadFile'
            this.editor.customConfig.uploadImgMaxLength = 1
            this.editor.customConfig.uploadImgParams = {
                  // 属性值会自动进行 encode ，此处无需 encode
            },
            this.editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                var conf = {
                    width: 600,
                    height: 400,
                    quality:0.7,
                    fieldName:'uploadFile'
                };
                lrz(files[0],conf)
                .then(function (rst) {
                    //处理成功会执行
                    //files[0] = rst.file
                    //console.log(rst);
                    //flag = false
                    xhr.send(rst.formData)
                })
                .catch(function (err) {
                    // 处理失败会执行
                    console.log("处理失败")
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                });        
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
        
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // customInsert: function (insertImg, result, editor) {
            //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
            
            //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            //     var url = result.url
            //     insertImg(url)
            // }
        }
            this.editor.create()
        },
        say(){
            this.sayshow = !this.sayshow
        },
        send(){
            //console.log(this.editor.txt.html())
            //console.log(this.editor.txt.text().toString())
            if(this.editor.txt.html()!=='<p><br></p>'){
                this.context.content = this.editor.txt.html()
                this.$http.post("/announce/addAnnounce.go",this.context)
                .then(res=>{
                    if(!res.data.errcode){
                        this.sayshow = false
                        this.$Message.success(res.data.msg)
                        this.clear()
                        this.addAnnounce()
                    }else{
                        this.$Message.success(res.data.msg)
                    }
                })
                .catch(err=>{
                    this.$Message.error('发言失败请检查网络')
                })
            }else{
                this.$Message.error('内容不能为空')
            }
            
        },
        clear(){
            this.editor.txt.text("")
            //console.log(this.editor.txt.text())
        },
        addAnnounce(){
            this.$store.dispatch('addAnnounce')
        }
    },
    mounted(){   
        this.createEditor()
                  
    }
}
</script>
<style scoped>
    
    #card{
        width: 60%;
        margin:0 auto;
    }
    #editor{
        
    }
    #btn{
        margin-top: 10px;
        text-align:right;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }

</style>