import ajax from '@common/ajax'
import {mapActions, mapMutations} from '@common/util'

const ns = 'home'

const initState = {
    param: null
}

const actionsInfo = mapActions({
    getParam({commit}, param) {
        commit(mTypes.setParam, param)
    }
}, ns)

const mutationsInfo = mapMutations({
    setParam(state, param) {
        state.param = param
    }
}, ns)



const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
