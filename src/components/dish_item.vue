<template>
    <div class="container-dish" @click="goDetail" style="cursor: pointer">
        <div style="height: 100%;width: 20%;">
            <img :src="dishInfo.picPath" style="width: 150px;height: 130px;object-fit: fill"/>
        </div>
        <div style="height: 100%;width: 20%;margin-left: 5%;display: flex;flex-direction: column;justify-content: center;align-items: flex-start">
            <el-button type="text" class="el-button-dish-name">{{dishInfo.dishName}}</el-button>
            <el-rate
                    v-model="dishInfo.star"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                    id="stars">
            </el-rate>
            <span class="span-price">￥ {{dishInfo.price}}</span>
        </div>
        <div style="width: 40%;height: 90%;margin-left: 5%">
            <el-tag type="warning" class="dish-tags" :style="{color: colors[Math.floor(Math.random()*5)]}"
                    v-for="text in dishInfo.tags.split('+')" :key="text">{{text}}</el-tag>
        </div>
<!--        <div style="width: 20%;height: 100%;display: flex;justify-content: center;align-items: center">-->
<!--            <el-button style="background-color: orangered;">下单</el-button>-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "dish_item",
        data() {
            return {
                dishInfo: this.info,
                colors: [
                    'green','purple','red','orange','blue'
                ],
            }
        },
        props: {
            info: Object
        },
        methods: {
            goDetail() {
                this.$store.commit('setDishID',this.dishInfo.dishID)
                this.$router.replace('detail')
            }
        }
    }
</script>

<style scoped>
    .container-dish{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .span-price{
        font-size: large;
        color: red;
    }
    .el-button-dish-name{
        font-size: large;
        color: orangered;
        font-family: "Microsoft YaHei";
    }
</style>