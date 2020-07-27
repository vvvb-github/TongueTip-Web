<template>
    <div class="container-dish" @click="goDish" style="cursor: pointer">
        <div id="pic-dish">
            <img id="pic" :src="hostInfo.picPath"/>
        </div>
        <div id="info-dish">
            <el-button type="text" id="name">{{hostInfo.hostName}}</el-button>
            <el-rate
                    v-model="hostInfo.star"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                    id="stars"
            v-if="hostInfo.star>0">
            </el-rate>
            <span v-else style="color: black;font-family: 'Microsoft YaHei';font-size: medium">暂无评分</span>
            <span id="location">位置：{{hostInfo.location}}</span>
            <span id="phone">联系方式：{{hostInfo.phone}}</span>
        </div>
    </div>
</template>

<script>
    import JS from "@/JS";

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
                this.$store.commit('setHostID',this.hostInfo.hostID)
                JS.home.getHostByID(this)
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
        justify-content: space-around;
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