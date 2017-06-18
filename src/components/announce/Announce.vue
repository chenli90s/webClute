<template>
    <div id="announce">
        <card id="card">
            <div id="content">
                <div v-html="context.content"></div>
            </div>
            <div id="footer"></div>
        </card>
    </div>   
</template>

<script>
    export default {
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