<template>
    <div id="announce">
        <card id="card">
            <div>
                <img :src="headimg" id="headimg" style='float:left'></img>
                <p style="margin-left:55px">{{name}}</p>
                <p style="margin-left:55px;margin-top:5px">11:20</p>
            </div>
            
            <div id="content">
                <div v-html="context.content"></div>
            </div>
            <div id="footer">
            <div id="border"></div>
                <div id="icons">
                    <Icon id="icon" type="heart" size="20"></Icon>
                    <Icon id="icon" type="chatbubble" size="20"></Icon>
                    <Icon id="icon" type="paper-airplane" size="20"></Icon>
                </div>        
            </div>
        </card>
    </div>   
</template>

<script>
    export default {
        data(){
            return{
                headimg: this.$store.state.userHead.info,
                name: 'haha'
            }
        },
        props: {
            context: {
                type: Object,
                default(){
                    return {
                        "aid": "457e27f1b5e844c1b8a7cde93644f943",
                        "status": "yum",
                        "content": "<p>倒萨倒萨</p>",
                        "date": 1497607144000,
                        "hot": 0,
                        "attribute": "stu",
                        "userid": "a9c91d4e0fe848408e52b2ce5cc45e20",
                        "comments": null
                    }
                }
            }
        }
    }
</script>
<style scoped>
    #card{
        margin: 10px;
    }
    #border{
        height:1px;
        background-color: #4C5A5A
    }
    #icons{
        text-align: right;
        margin-top:10px;
    }
    #icon{
        margin-right: 10px;
    }
    #headimg{
        width:40px;
        height:40px;
        border-radius: 20px;
    }
    #content{
        margin-top: 10px;
        margin-bottom: 15px;
        background-color: #fff;
    }
    table {
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    table td,
    table th {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
    }
    table th {
      border-bottom: 2px solid #ccc;
      text-align: center;
    }

    /* blockquote 样式 */
    blockquote {
      display: block;
      border-left: 8px solid #d0e5f2;
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }

    /* code 样式 */
    code {
      display: inline-block;
      *display: inline;
      *zoom: 1;
      background-color: #f1f1f1;
      border-radius: 3px;
      padding: 3px 5px;
      margin: 0 3px;
    }
    pre code {
      display: block;
    }

    /* ul ol 样式 */
    ul, ol {
      margin: 10px 0 10px 20px;
    }
</style>