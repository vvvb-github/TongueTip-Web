<template>
    <div id="container-hot" @click="go" style="cursor: pointer">
        <div id="hot-img">
            <img style="width: 100%;height: 100%;object-fit:fill" :src="hotInfo.picPath.split('+')[0]"/>
        </div>
        <div id="hot-info">
            <el-button type="text" id="name">{{hotInfo.dishName}}</el-button>
            <span id="location">{{hotInfo.location}}</span>
        </div>
    </div>
</template>

<script>
    import JS from "@/JS";

    export default {
        name: "hot_item",
        data() {
            return {
                hotInfo: this.info
            }
        },
        props: {
            info: Object
        },
        methods: {
            go() {
                this.$store.commit('setDishID',this.hotInfo.dishID)
                JS.home.goDish(this)
            }
        }
    }
</script>

<style scoped>
    #container-hot{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background-color: white;
    }
    #hot-img{
        width: 100%;
        height: 70%;
    }
    #hot-info{
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #name{
        color: orangered;
        font-size: large;
        font-style: italic;
    }
</style>