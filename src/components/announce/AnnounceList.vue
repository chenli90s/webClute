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
    components:{
        announce: announce,
    },
    computed: {
        ...mapState({
            newAnnounce: 'newAnnounce'
        }),
        contexts(){
            if(this.newAnnounce !==''){
                let contexts = this.context.unshift(this.newAnnounce)
                console.log(this.context)
                return this.context
            }
            console.log(this.context)
            return this.context
        }
    },
    mounted(){
        this.$http.post("/announce/getAnnounce.go",this.page)
        .then(res=>{
            //console.log(res.data)
            this.context = res.data
            this.success = true
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
</style>