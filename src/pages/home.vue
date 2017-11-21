<template>
    <h1>{{teamInfo.teamsxname}}</h1>
</template>

<script>
import {aTypes} from '~store/home'
export default {
    async asyncData ({store, route: {params}}) {
        await store.dispatch(aTypes.getTeamInfo)
    },
    computed: {
        teamInfo() {
            return this.$store.state.home.teamInfo
        }
    },
    methods: {
        fetchData() {
            this.$store.dispatch(aTypes.getTeamInfo)
        }
    },
    mounted() {
//        this.fetchData()
    }
}
</script>

<style scoped>
    h1 {
        color: black;
        font-size: 1rem;
    }
</style>
