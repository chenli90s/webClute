import types from './types'
import axios from 'axios'

export default {
    showuserdialog: ({commit})=>{
        commit(types.SHOWUSERDIALOG)
    },
    loginsuccess: ({commit})=>{
        //console.log("登陆成功")
        commit(types.LOGINSUCCESS)
    },
    addAnnounce: ({commit})=>{
        //console.log("dfsfdsf")
        axios.post('/announce/getAnnounce.go',{requestNum:1,currentPage:1})
        .then(res=>{
            //console.log(res.data)
            commit({
                type: 'addAnnounce',
                res: res.data
            })
        })
    }
}