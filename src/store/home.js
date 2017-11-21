import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'

const ns = 'home'

const initState = {
    teamInfo: null
}

const actionsInfo = mapActions({
    async getTeamInfo({commit}) {
        const teamInfo = await ajax.get(`/library/zq/teaminfo?teamid=455`)
        commit(mTypes.setTeamInfo, teamInfo)
        return teamInfo
    }
}, ns)

const mutationsInfo = mapMutations({
    setTeamInfo(state, teamInfo) {
        state.teamInfo = teamInfo
    }
}, ns)



const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
