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
    }
}