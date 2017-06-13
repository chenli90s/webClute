<template>
    <div id="pageinfo">


        <Card id="card">
          <div id="headimg">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
            </div>
          </div>
          <Upload action="/user/updataHeadImg.go" name="uploadFile"
          multiple="false"
          show-upload-list="false"
          :format="format"
          :on-success="success"       
          >
            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
       
        
        </Card>

        <Modal title="查看图片" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script scopedSlots>
    export default {
       data(){
           return {
               item: {
                   name: 'sda',
                   url: 'sda'
               },
               format: ['jpg','png','jpeg'],
               imgName: '',
               visible: false,
           }
       },
       methods: {
           success(re,file){

           },

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
    #updateimg{
        width: 200px;
        margin: 0 auto;
    }
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
