<template>
    <div class="container-dish" @click="goDish" style="cursor: pointer">
        <div id="pic-dish">
            <img id="pic" :src="hostInfo.m_picPath"/>
        </div>
        <div id="info-dish">
            <el-button type="text" id="name">{{hostInfo.m_hostName}}</el-button>
            <el-rate
                    v-model="hostInfo.m_star"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                    id="stars">
            </el-rate>
            <span id="location">位置：{{hostInfo.m_location}}</span>
            <span id="phone">联系方式：{{hostInfo.m_phoneNumber}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "host_item",
        data() {
            return {
                hostInfo: this.info
            }
        },
        props: {
            info: Object
        },
        methods: {
            goDish() {
                this.$store.commit('setHost',this.hostInfo)
                this.$router.replace('dishes')
            }
        }
    }
</script>

<style scoped>
    .container-dish{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    #pic-dish{
        width: 30%;
        height: 95%;
    }
    #pic{
        width: 120px;
        height: 100px;
        object-fit: fill;
    }
    #info-dish{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 70%;
        height: 95%;
        margin-left: 10%;
    }
    #name{
        font-size: large;
        font-family: "Microsoft YaHei";
        color: orangered;
        padding: 0;
        margin: 0;
    }
</style>