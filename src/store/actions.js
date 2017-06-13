import types from './types'

export default {
    showuserdialog: ({commit})=>{
        commit(types.SHOWUSERDIALOG)
    },
    loginsuccess: ({commit})=>{
        //console.log("登陆成功")
        commit(types.LOGINSUCCESS)
    }
}