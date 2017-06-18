<template>
    <div id="announcelist">
        <Spin id="loading" v-show="!success"  size="large"></Spin>
        <div id="announces" v-if="success" >
            <announce v-for="item in contexts" :context="item" :key="item.aid"></announce>
        </div>
    </div>
</template>
<script>
import announce from './announce'
export default {
    data(){
        return{
            contexts: '',
            success: false,
            page:{
                requestNum:10,
                currentPage:1
            }
        }
    },
    components:{
        announce: announce
    },
    mounted(){
        this.$http.post("/announce/getAnnounce.go",this.page)
        .then(res=>{
            //console.log(res.data)
            this.contexts = res.data
            this.success = true
        })

    }
}    
</script>
<style scoped>
    #announcelist{
        width: 60%;
        margin: 0 auto;
    }
    #loading{
        position: absolute;
        top: 30%;
        right: 50%;
    }   
</style>