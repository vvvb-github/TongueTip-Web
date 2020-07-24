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
                    id="stars">
            </el-rate>
            <span id="location">位置：{{hostInfo.location}}</span>
            <span id="phone">联系方式：{{hostInfo.phone}}</span>
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
                this.$store.commit('setHostID',this.hostInfo.hostID)
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