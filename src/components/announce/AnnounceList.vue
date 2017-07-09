<template>
    <div id="announcelist">
        <Spin id="loading" v-show="!success"  size="large"></Spin>
            <transition name="fade">
                <div id="announces" v-if="success" >
                    <announce v-for="item in contexts" :context="item" :key="item.aid"></announce>
                </div>
            </transition>  
    </div>
</template>
<script>
import announce from './announce'
import {mapState} from 'Vuex'
export default {
    data(){
        return{
            context: '',
            success: false,
            page:{
                requestNum:10,
                currentPage:1
            }
        }
    },
    methods: {
        loadMore(requestNum){
            let page = {
                currentPage: this.contexts.length,
                size: requestNum
            }
            this.$http.post("/announce/loadMoreAnnounce.go",page)
            .then(res => {
                if(!res.data.errcode){
                    //console.log(res.data[0])
                    this.contexts.push(res.data[0])
                }
            })
        }
    },
    components:{
        announce: announce,
    },
    computed: {
        ...mapState({
            newAnnounce: 'newAnnounce',
            oldAnnounce: 'oldAnnounce'
        }),
        contexts(){
            if(this.newAnnounce !==''){
                let contexts = this.context.unshift(this.newAnnounce)
            }
            if(this.oldAnnounce !== ''){
                for(let index in this.context){
                    if(this.context[index].aid == this.oldAnnounce){
                        this.context.splice(index,1)
                        let contexts = this.context
                        this.$Message.success('删除成功')
                        this.loadMore(1)
                    }
                }   
            }
            return this.context
        }
    },
    mounted(){
        this.$http.post("/announce/getAnnounce.go",this.page)
        .then(res=>{
            //console.log(res.data)
            if(!res.data.errcode){
                this.context = res.data
                this.success = true
            }else{
                this.success = true
                this.context = []
            }
            
        })
    },

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
    .fade-enter-active, .fade-leave-active {
      transition: opacity 2s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    } 
</style>