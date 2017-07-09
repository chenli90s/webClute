import types from './types'
import state from './state'
import getters from './getters'

export default {
    [types.SHOWUSERDIALOG](state) {       
        //console.log(state.dialogFromVisible)
        state.dialogFromVisible = true
    },
    [types.LOGINSUCCESS](state) {
        state.loginsuccess = true
    },
    addAnnounce(state,res){
        state.newAnnounce = res.res[0]
    },
    delAnnounce(state,res){
        state.oldAnnounce = res.res.data
    }
}